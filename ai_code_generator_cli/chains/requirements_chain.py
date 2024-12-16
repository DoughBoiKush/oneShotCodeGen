from transformers import pipeline
from langchain.chains import LLMChain, SequentialChain
from ai_code_generator_cli.prompts.requirements_prompts import (
    get_functional_requirements_prompt,
    get_technical_requirements_prompt
)
from ai_code_generator_cli.utils.memory_utils import create_memory  # Assuming this handles memory correctly
import logging
import torch

logger = logging.getLogger(__name__)



# Choose a quantized CodeLlama model (adjust as needed - see recommendations below):
model_name = "TheBloke/CodeLlama-7B-Instruct-GGUF"


# Initialize the pipeline – set `torch_dtype` and `device_map` for efficiency
generator = pipeline(
    "text-generation",
    model=model_name,
    torch_dtype=torch.bfloat16,  # Use bfloat16 for better performance
    device_map="auto",  # Use GPU if available, or CPU
)


def get_llm(streaming: bool = False):  # No provider needed, using single model
    return generator  # Returns the transformers pipeline


def create_requirements_chain(func_version: str, tech_version: str):
    """Create the requirements generation chain using the free CodeLlama model."""
    try:
        # Create LLMs (using the same free model)
        functional_llm = get_llm()
        technical_llm = get_llm()

        # ... (rest of the code remains the same – prompts, memory, chain creation)


    except Exception as e:
        logger.error(f"Error creating requirements chain: {str(e)}")
        raise
