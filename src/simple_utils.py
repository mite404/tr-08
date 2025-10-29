# simple_utils.py - A tiny utility library

def reverse_string(text):
    """
    Reverse the characters in a string.
    
    Parameters:
        text (str): The string whose characters will be reversed.
    
    Returns:
        str: The input string with characters in reverse order.
    """
    return text[::-1]

def count_words(sentence):
    """
    Count the number of words in a string separated by whitespace.
    
    Parameters:
        sentence (str): Input string to count words in.
    
    Returns:
        int: Number of whitespace-delimited words in the input string.
    """
    return len(sentence.split())

def celsius_to_fahrenheit(celsius):
    """
    Convert a temperature from degrees Celsius to degrees Fahrenheit.
    
    Parameters:
        celsius (float): Temperature in degrees Celsius.
    
    Returns:
        float: Temperature in degrees Fahrenheit.
    """
    return (celsius * 9/5) + 32