// @flow

import * as React from 'react'
import { Grid, Form, Button, Container } from 'semantic-ui-react'

type Props = {
  ownerId: string,
  onSubmit: (ownerId: string) => void
}

type State = {
  ownerId: string
}

class GetZombiesByOwner extends React.Component<Props, State> {
  state = {
    ownerId: this.props.ownerId
  }

  handleChange = (e: SyntheticInputEvent<>) => {
    this.setState({
      ownerId: e.target.value
    })
  }

  handleSubmit = (e: SyntheticEvent<>) => {
    e.preventDefault();
    this.props.onSubmit(this.state.ownerId);
    this.setState({
      ownerId: ''
    })
  }

  render() {
    return (
      <Grid.Column>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field
              label="Your zombies:"
              control="input"
              placeholder="Address..."
              value={this.state.ownerId}
              onChange={this.handleChange}
            />
            <Button type="Submit">Submit</Button>
          </Form>
        </Container>
      </Grid.Column>
    )
  }
}

export default GetZombiesByOwner
