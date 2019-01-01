// @flow

import * as React from 'react'
import ZombieOwnership from './contracts/ZombieOwnership.json'
import getWeb3 from './utils/getWeb3'
import { Header, Container, Grid } from 'semantic-ui-react'
import CreateNewZombie from './CreateNewZombie.js'
import Attack from './Attack.js'
import MyZombieContainer from './MyZombieContainer.js'

type State = {
  web3: Object,
  accounts: Array<string>,
  contract: Object,
  myZombies: Array<mixed>

}

class App extends React.Component<{}, State> {
  state = {
    web3: {},
    accounts: [],
    contract: {},
    myZombies: []
  }

  componentDidMount = async () => {

    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3()
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts()
      // Get the contract instance.
      const networkId = await web3.eth.net.getId()
      const deployedNetwork = ZombieOwnership.networks[networkId]
      const instance = new web3.eth.Contract(
        ZombieOwnership.abi,
        deployedNetwork && deployedNetwork.address,
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample)
      this.getZombiesByOwner(accounts[0])
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      )
      console.error(error)
    }
  }

  runExample = async () => {
    const { accounts, contract } = this.state;
    const updateUser = (accounts) => {
      this.setState({
        accounts: accounts
      })
      this.getZombiesByOwner(accounts[0])
    }
    window.ethereum.on('accountsChanged', (account)=> {
      updateUser(account);
    })
    contract.events.NewZombie()
      .on('data', function(event){
        console.log(event); // same results as the optional callback above
      })
      .on('changed', function(event){
        // remove event from local database
      })
      .on('error', console.error)
  }

  createRandomZombie = async (zombieName: string):Promise<any> => {
    this.state.contract.methods.createRandomZombie(zombieName)
      .send({ from: this.state.accounts[0] })
      .then(() => this.getZombiesByOwner(this.state.accounts[0]))
  }

  getZombiesByOwner = async (owner: string) => {
    const ids = await this.state.contract.methods.getZombiesByOwner(owner).call()
    let zombies = [];
    for (let i = 0; i < ids.length; i++) {
      let zombie = await this.getZombieDetails(ids[i])
      let newZombie = {
        id: ids[i],
        name: zombie.name,
        dna: zombie.dna,
        level: zombie.level,
        readyTime: zombie.readyTime,
        winCount: zombie.winCount,
        lossCount: zombie.lossCount
      }
      zombies.push(newZombie)
    }
    this.setState({
      myZombies: zombies
    })
  }

  getZombieDetails = async (id: number) => {
    return await this.state.contract.methods.zombies(id).call()
  }

  attack = async (myZombieId: string, enemyZombieId: string):Promise<any> => {
    this.state.contract.methods.attack(myZombieId, enemyZombieId)
      .send({ from: this.state.accounts[0] })
      .on('error', console.error)
  }

  changeName = async (name: string) => {

  }

  changeDna = async (dna: number) => {

  }

  transfer = async () => {

  }

  ownerOf = async () => {

  }

  balanceOf = async () => {

  }



  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <Container className="App">
        <Container>
          <Container  style={{ marginTop: '7em' }} text textAlign="center">
            <Header as='h1'>Zombies!</Header>
          </Container>
          <br />
          <Grid columns={2} relaxed>
            <Grid.Row>
              <CreateNewZombie onSubmit={this.createRandomZombie} />
              <Attack onSubmit={this.attack} />
            </Grid.Row>
            <Grid.Row>
              <MyZombieContainer zombies={this.state.myZombies} />
            </Grid.Row>
          </Grid>
          <h1>
          </h1>
        </Container>
      </Container>
    );
  }
}

export default App;
