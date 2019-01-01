// @flow

import * as React from 'react'
import { Card, Container } from 'semantic-ui-react'

type Props = {
  name: string,
  id: number,
  dna: number,
  level: number,
  readyTime: number,
  winCount: number,
  lossCount: string
}

const Zombie = ( props: Props ) => (
  <Card>
    <Card.Content>
      <Card.Header>
        {props.name}
      </Card.Header>
      <Card.Meta>
        id: {props.id}<br />
        dna: {props.dna}
      </Card.Meta>
      <Card.Description>
        Level: {props.level}<br />
        ReadyTime: {props.readyTime}<br />
        WinCount: {props.winCount}<br />
        LossCount:  {props.lossCount}
      </Card.Description>
    </Card.Content>
  </Card>
)

export default Zombie
