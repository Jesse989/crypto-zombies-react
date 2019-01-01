// @flow

import * as React from 'react'
import { Grid, Form, Button, Container } from 'semantic-ui-react'

type Props = {
  onSubmit: (nameValue: string) => Promise<any>
}

type State = {
  nameValue: string
}


class CreateNewZombie extends React.Component<Props, State> {
  state = {
    nameValue: ''
  }

  handleChange = (e: SyntheticInputEvent<>) => {
    this.setState({
      nameValue: e.target.value
    })
  }

  handleSubmit = (e: SyntheticEvent<>) => {
    e.preventDefault();
    this.props.onSubmit(this.state.nameValue);
    this.setState({
      nameValue: ''
    })
  }

  render() {
    return (
        <Grid.Column>
          <Container>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field
                label="Create new zombie:"
                control="input"
                placeholder="Zombie name..."
                value={this.state.nameValue}
                onChange={this.handleChange}
              />
              <Button type="Submit">Submit</Button>
            </Form>
          </Container>
        </Grid.Column>
    )
  }
}

export default CreateNewZombie;
