from typing import Dict, Any
from .base_step import BaseStep
from ..chains.requirements_chain import get_llm, ModelProvider
from ..utils.file_utils import process_code_structure

class CodeGenerationStep(BaseStep):
    def __init__(self, name: str, prompt_template: str, model_provider: ModelProvider, output_path: str = None):
        super().__init__(name, prompt_template)
        self.llm = get_llm(model_provider)
        self.output_path = output_path

    def execute(self, step_outputs: Dict[str, Any], context: Dict[str, Any]) -> str:
        formatted_prompt = self.format_prompt(step_outputs, context)
        return self.llm.predict(formatted_prompt)