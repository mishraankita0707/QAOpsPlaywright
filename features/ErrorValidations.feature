Feature: Ecommerce validations

@Validation
  
    Scenario Outline: Placing the order
    Given login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify error message is displayed

    Examples:
        | username                      | password             |
        | ankita@gmail.com              | Password@7           |
        | ankitamishra@gmail.com        | Password@7           |