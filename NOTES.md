Search the codebase for `TODO:` to find comments I've left throughout along with the ones below.

### Choices

#### Redux
It didn't feel necessary for the scale of this task. The `ConditionalStepper` component keeps control of the state of the form until completion. Adding Redux at this point would have added additional complexity.

#### FormFields
Normally I'd use an existing library (e.g. `react-final-form`) to handle form building, but didn't know if that would be "directly addressing the problem". In this case, I've created my own `FormField` component to handle (at the moment) the input fields. It defines when an error message should be shown and is easily customisable and extensible. Getting the checkboxes on the Privacy tab to use it should take minimal effort.

#### Validation
Joi is been my go-to validation tool when build NodeJS APIs and since v16 they've added browser support so felt like a no brainer. The password field could do with some work. At the moment the error messages are the same, but it would be good to show in the UI which rules your password adheres to as you're typing it. You currently need to type an invalid password to see what the rules are - not great! 

#### Plain CSS
I was trying to make sure it was reviewed today (14/05/2020) so decided to go old school and write some basic CSS to make sure the layout worked.

Normally I'd use a pre-existing component library (e.g. `material-ui`) or `styled-components` if it's more custom. If this is something you feel you need to see me use, then I'm happy to go back and add this in.
