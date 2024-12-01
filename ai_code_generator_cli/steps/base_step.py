from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Any, Dict
from rich.console import Console

console = Console()

@dataclass
class StepInput:
    prompt_template: str
    step_outputs: Dict[str, Any]
    context: Dict[str, Any]

class BaseStep(ABC):
    def __init__(self, name: str, prompt_template: str):
        self.name = name
        self.prompt_template = prompt_template

    @abstractmethod
    def execute(self, step_outputs: Dict[str, Any], context: Dict[str, Any]) -> Any:
        pass

    def format_prompt(self, step_outputs: Dict[str, Any], context: Dict[str, Any]) -> str:
        try:
            return self.prompt_template.format(
                **step_outputs,
                **context
            )
        except KeyError as e:
            console.print(f"[red]Error formatting prompt: Missing key {e}[/red]")
            raise