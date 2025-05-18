from fastapi import FastAPI, UploadFile, File
from transformers import TrOCRProcessor, VisionEncoderDecoderModel
from PIL import Image, ImageOps
import torch
import io
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (or specify ["http://localhost:5173"])
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Load TrOCR model and processor
processor = TrOCRProcessor.from_pretrained("microsoft/trocr-base-handwritten")
model = VisionEncoderDecoderModel.from_pretrained("microsoft/trocr-base-handwritten")
model.eval()

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        # Read the uploaded image
        image = Image.open(io.BytesIO(await file.read())).convert("RGB")

        # Resize while keeping aspect ratio
        image.thumbnail((384, 384), Image.Resampling.LANCZOS)

        # Convert to grayscale and enhance contrast
        image = image.convert("L")
        image = ImageOps.autocontrast(image)
        image = image.convert("RGB")  # Convert back for TrOCR compatibility

        print("Processed Image Size:", image.size)

        # Convert image to tensor
        pixel_values = processor(images=image, return_tensors="pt").pixel_values

        # Generate text
        with torch.no_grad():
            generated_ids = model.generate(pixel_values, max_length=100, num_beams=7, early_stopping=True)

        # Decode text output
        extracted_text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0].strip()

        print("Predicted Text:", extracted_text)

        return {"extracted_text": extracted_text}

    except Exception as e:
        return {"error": str(e)}
