from typing import List, Dict
from ..steps.requirement_generation_step import RequirementGenerationStep
from ..steps.code_generation_step import CodeGenerationStep
from ..prompts.requirements_prompts import (
    FUNCTIONAL_REQUIREMENTS_V1,
    TECHNICAL_REQUIREMENTS_V1
)
from ..prompts.code_generation_prompts import (
    CODE_GENERATION_V2_BACKEND,
    CODE_GENERATION_V2_FRONTEND
)

def get_step_pipeline_config(pipeline_name: str, model_provider: ModelProvider, base_path: str) -> List[Dict]:
    configs = {
        'requirements_and_code': [
            RequirementGenerationStep(
                name="functional_requirements",
                prompt_template=FUNCTIONAL_REQUIREMENTS_V1,
                model_provider=model_provider
            ),
            RequirementGenerationStep(
                name="technical_requirements",
                prompt_template=TECHNICAL_REQUIREMENTS_V1,
                model_provider=model_provider
            ),
            CodeGenerationStep(
                name="backend",
                prompt_template=CODE_GENERATION_V2_BACKEND,
                model_provider=model_provider,
                output_path=f"{base_path}/backend"
            ),
            CodeGenerationStep(
                name="frontend",
                prompt_template=CODE_GENERATION_V2_FRONTEND,
                model_provider=model_provider,
                output_path=f"{base_path}/frontend"
            )
        ]
    }
    
    return configs.get(pipeline_name)