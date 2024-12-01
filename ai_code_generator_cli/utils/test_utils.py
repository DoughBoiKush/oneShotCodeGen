import os
from rich.console import Console
from .file_utils import beautify_file, check_prettier, process_code_structure

console = Console()

def test_beautify_file(file_path: str):
    """
    Test beautification of a specific file
    
    Args:
        file_path (str): Path to the JavaScript/TypeScript file to beautify
    """
    try:
        # Check if file exists
        if not os.path.exists(file_path):
            console.print(f"[red]File not found:[/red] {file_path}")
            return
            
        # Show original content
        console.print("\n[yellow]Original file content:[/yellow]")
        with open(file_path, 'r', encoding='utf-8') as f:
            console.print(f.read())
            
        # Check js-beautify and beautify file
        console.print("\n[yellow]Testing beautify...[/yellow]")
        if check_prettier():
            beautify_file(file_path)
            
            # Show beautified content
            console.print("\n[yellow]Beautified content:[/yellow]")
            with open(file_path, 'r', encoding='utf-8') as f:
                console.print(f.read())
        else:
            console.print("[red]js-beautify check failed[/red]")
            
    except Exception as e:
        console.print(f"[red]Test failed:[/red] {str(e)}")

def test_process_code_structure(input_file_path: str, base_path: str = ".", component_type: str = None, beautify: bool = False):
    """
    Test processing of a code structure from an input file
    
    Args:
        input_file_path (str): Path to the file containing the code structure
        base_path (str): Base path where files should be created
        component_type (str): Type of component being created
        beautify (bool): Whether to beautify the generated files
    """
    try:
        # Check if input file exists
        if not os.path.exists(input_file_path):
            console.print(f"[red]Input file not found:[/red] {input_file_path}")
            return

        # Read the code structure from file
        console.print(f"[yellow]Reading code structure from:[/yellow] {input_file_path}")
        with open(input_file_path, 'r', encoding='utf-8') as f:
            code_structure = f.read()

        # Process the code structure
        console.print("\n[yellow]Processing code structure...[/yellow]")
        process_code_structure(
            code_structure=code_structure,
            base_path=base_path,
            component_type=component_type,
            beautify=beautify
        )
        
        console.print("[green]Code structure processing completed successfully[/green]")

    except Exception as e:
        console.print(f"[red]Test failed:[/red] {str(e)}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        console.print("[red]Please provide a command and file path as arguments[/red]")
        console.print("Usage:")
        console.print("  test_beautify: python test_utils.py beautify <file_path>")
        console.print("  test_process: python test_utils.py process <input_file> [base_path] [component_type] [beautify]")
    else:
        command = sys.argv[1]
        if command == "beautify" and len(sys.argv) > 2:
            test_beautify_file(sys.argv[2])
        elif command == "process":
            if len(sys.argv) < 3:
                console.print("[red]Please provide an input file path[/red]")
            else:
                base_path = sys.argv[3] if len(sys.argv) > 3 else "."
                component_type = sys.argv[4] if len(sys.argv) > 4 else None
                beautify = sys.argv[5].lower() == "true" if len(sys.argv) > 5 else False
                test_process_code_structure(sys.argv[2], base_path, component_type, beautify)
        else:
            console.print(f"[red]Unknown command:[/red] {command}") 