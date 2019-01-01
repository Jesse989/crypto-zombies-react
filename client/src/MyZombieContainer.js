// @flow

import * as React from 'react'
import { Grid, Container } from 'semantic-ui-react'
import Zombie from './Zombie.js'
import uuid from 'uuid'

type State = {
  myZombies: Array<mixed>
}

type Props = {
  zombies: Array<mixed>
}


class MyZombieContainer extends React.Component<Props, State> {
  state: {
    myZombies: mixed[]
  }


  render() {
    const mappedZombies = this.props.zombies.map((zombie: Object) => (
      <Zombie
        key={uuid.v4()}
        id={zombie.id}
        name={zombie.name}
        dna={zombie.dna}
        level={zombie.level}
        readyTime={zombie.readyTime}
        winCount={zombie.winCount}
        lossCount={zombie.lossCount}
      />
      )
    )

    return (
      <Container>
        {mappedZombies}
      </Container>
    )
  }
}

export default MyZombieContainer
