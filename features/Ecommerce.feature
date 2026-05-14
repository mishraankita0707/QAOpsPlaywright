Feature: Ecommerce validations

@Regression
  Scenario: Placing the order
    Given login to Ecommerce application with "mishraankita0794@gmail.com" and "Password@7"
    When Add "zara coat 3" to Cart
    Then Verify "zara coat 3" is displayed in the Cart
    When Enter valid details and place the order
    Then Verify order is present in the OrderHistory
    Given login to Ecommerce application with "kajolmishra@gmail.com" and "Password@7"