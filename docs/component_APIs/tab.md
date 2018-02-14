# Tab

A component with different named tabs containing other components.

Each child is required to have a label prop that is displayed at the top and names the tab.

```javascript
import React, { Component } from 'react';

import { render, Window, App, Tab, TextInput } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" height={500} width={500}>
            <Tab>
                <TextInput label="Tab1" />
                <TextInput label="Tab2" />
            </Tab>
        </Window>
      </App>
    );
  }
}

render(<Example />);
```

## Props

- [enabled](#enabled)
- [visible](#visible)

## Reference

### enabled

Whether the Tab is enabled.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### visible

Whether the Tab can be seen.

| **Type** | **Required** |
| --- | --- |
| bool | No |