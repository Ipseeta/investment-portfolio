import pytest
from app import Calculator  # Assuming you have a Calculator class in app.py

class TestCalculator:
    def setup_method(self):
        """Setup method that runs before each test"""
        self.calc = Calculator()

    def test_addition(self):
        """Test addition of two numbers"""
        assert self.calc.add(2, 3) == 5
        assert self.calc.add(-1, 1) == 0
        assert self.calc.add(0, 0) == 0

    def test_division(self):
        """Test division of two numbers"""
        assert self.calc.divide(6, 2) == 3
        assert self.calc.divide(5, 2) == 2.5
        
        # Test division by zero
        with pytest.raises(ValueError):
            self.calc.divide(4, 0)

    def test_string_length(self):
        """Test string length calculation"""
        assert self.calc.get_string_length("hello") == 5
        assert self.calc.get_string_length("") == 0
        assert self.calc.get_string_length(" ") == 1

    @pytest.mark.parametrize("input_list, expected_sum", [
        ([1, 2, 3], 6),
        ([], 0),
        ([-1, 1], 0),
        ([1.5, 2.5], 4.0)
    ])
    def test_list_sum(self, input_list, expected_sum):
        """Test sum of list elements using parameterized testing"""
        assert self.calc.sum_list(input_list) == expected_sum
