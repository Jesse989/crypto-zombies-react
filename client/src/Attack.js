// @flow

import * as React from 'react'
import { Grid, Container, Form, Button } from 'semantic-ui-react'

type Props = {
  onSubmit: (myZombieId: string, enemyZombieId: string) => Promise<any>
}

type State = {
  fields: {
    myZombieId: string,
    enemyZombieId: string
  }
}

class Attack extends React.Component<Props, State> {
  state = {
    fields: {
      myZombieId: '',
      enemyZombieId: ''
    }
  }

  handleChange = (e: SyntheticInputEvent<>) => {
    const fields = Object.assign({}, this.state.fields)
    fields[e.target.name] = e.target.value
    this.setState({fields});
  }

  handleSubmit = (e: SyntheticEvent<>) => {
    e.preventDefault()
    this.props.onSubmit(this.state.fields.myZombieId, this.state.fields.enemyZombieId)
    this.setState({
      fields: {
        myZombieId: '',
        enemyZombieId: ''
      }
    })
  }

  render() {
    return (
      <Grid.Column>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Field
                name="myZombieId"
                label="Your zombie"
                control="input"
                placeholder="id..."
                value={this.state.fields.myZombieId}
                onChange={this.handleChange}
              />
              <Form.Field
                name="enemyZombieId"
                label="Enemy zombie"
                control="input"
                placeholder="id..."
                value={this.state.fields.enemyZombieId}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button type="Submit">Submit</Button>
          </Form>
        </Container>
      </Grid.Column>
    )
  }
}

export default Attack
