---
sidebar_position: 10
title: "Control Validation"
---

import Image from '@theme/IdealImage';

# Control Validation

This chapter covers implementing control validation in DWC applications.

## Overview

The DWC provides built-in validation capabilities that allow you to validate user input with visual feedback.

## Validation Attributes

Controls support validation attributes that provide automatic validation:

| Attribute | Description |
|-----------|-------------|
| `required` | Field must have a value |
| `pattern` | Regex pattern the value must match |
| `min` / `max` | Minimum/maximum values for numbers |
| `minlength` / `maxlength` | Character length constraints |

## Setting Validation

### Required Field

```bbj
editBox!.setAttribute("required", "true")
editBox!.setAttribute("label", "Email Address")
```

### Pattern Validation

```bbj
rem Email pattern
editBox!.setAttribute("pattern", "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
editBox!.setAttribute("invalid-message", "Please enter a valid email address")
```

## Visual Feedback

When validation fails:
- The control's border changes color (typically red for danger theme)
- The label changes color to match
- An invalid message can be displayed

<Image img={require('@site/static/img/Validation_1.png')} alt="Validation Visual Feedback" />

<Image img={require('@site/static/img/Validation_2.png')} alt="Validation States Example" />

## Validation States

Controls have three validation states:

1. **Valid** - Input meets all requirements
2. **Invalid** - Input fails validation
3. **Pristine** - Control hasn't been interacted with yet

![Validation Demo](/img/Validation_demo.gif)

## Checking Validation in Code

```bbj
rem Check if a control is valid
if (editBox!.isValid()) then
    rem Process the form
else
    rem Show error message
endif
```

## Custom Validation

For complex validation logic:

```bbj
rem Set custom validity
editBox!.setCustomValidity("This username is already taken")

rem Clear custom validity
editBox!.setCustomValidity("")
```

<Image img={require('@site/static/img/Validation_3.png')} alt="Custom Validation Example" />

<Image img={require('@site/static/img/Validation_4.png')} alt="Validation Patterns" />

## Example - Email Validation

```bbj
rem Create email input with validation
email! = wnd!.addEditBox("")
email!.setAttribute("label", "Email")
email!.setAttribute("required", "true")
email!.setAttribute("type", "email")
email!.setAttribute("invalid-message", "Please enter a valid email")
```

<Image img={require('@site/static/img/Validation_5.png')} alt="Email Validation Example" />

![Validation Demo 2](/img/Validation_demo2.gif)

## Exercise: Adding Validation to an Email Field

Run `DWCTraining/07_ControlValidation/` examples to see validation in action.

<Image img={require('@site/static/img/Validation_6.png')} alt="Validation Exercise" />

<Image img={require('@site/static/img/Validation_7.png')} alt="More Validation Examples" />

### Testing Regular Expressions

Use [Regex101](https://regex101.com) to test your validation patterns:

<Image img={require('@site/static/img/Regex101.png')} alt="Regex101 for testing patterns" />

<Image img={require('@site/static/img/Validation_8.png')} alt="Validation Complete Example" />

![Validation Demo 3](/img/Validation_demo3.gif)

<Image img={require('@site/static/img/Validation_9.png')} alt="Final Validation Example" />

## Best Practices

1. **Always provide helpful error messages** - Tell users what's wrong and how to fix it
2. **Validate on blur** - Check fields when the user leaves them
3. **Use appropriate input types** - Email, number, etc. provide built-in validation
4. **Combine client and server validation** - Never trust client-side validation alone
