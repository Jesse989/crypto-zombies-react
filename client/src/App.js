import React, { Component } from "react"
import ZombieFactory from "./contracts/ZombieFactory.json"
import getWeb3 from "./utils/getWeb3"
import { Button, Form, Header, Container } from "semantic-ui-react"

class App extends Component {
  state = {
    nameValue: '',
    web3: null,
    accounts: null,
    contract: null
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3()

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts()

      // Get the contract instance.
      const networkId = await web3.eth.net.getId()
      const deployedNetwork = ZombieFactory.networks[networkId]
      const instance = new web3.eth.Contract(
        ZombieFactory.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample)
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
    contract.events.NewZombie()
      .on('data', function(event){
        console.log(event); // same results as the optional callback above
      })
      .on('changed', function(event){
        // remove event from local database
      })
      .on('error', console.error)
  }

  handleChange = (e) => {
    this.setState({
      nameValue: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.state.contract.methods.createRandomZombie(this.state.nameValue)
      .send({ from: this.state.accounts[0] })
      .on('error', console.error)
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Container textAlign='center'>
          <Header as='h1'>Zombies!</Header>
        </Container>
        <div className="ui raised very padded text container segment">
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={this.state.nameValue}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Button type="Submit">Submit</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default App;
