from hello import say_hello
from primitive import primitive_examples
from controlFlow import process_species

def main():
    say_hello()
    print("\n--- Primitive Demo ---")
    primitive_examples()

    print("\n--- Species Processing ---")
    process_species()

if __name__ == "__main__":
    main()
