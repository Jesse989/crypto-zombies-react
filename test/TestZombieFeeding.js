const ZombieFeeding = artifacts.require('./ZombieFeeding.sol');

contract('ZombieFeeding', ([_, owner, ...accounts]) => {

  beforeEach(async () => {
    this.zombieInstance = await ZombieFeeding.new({ from: owner });
    await this.zombieInstance.createRandomZombie('zombie', { from: owner })
  })

  it('can createRandomZombie', async () => {
    assert.equal(await this.zombieInstance.owner(), owner, 'not owned by owner')
  });

  describe('setKittyContractAddress()', () => {
    it('', async () => {
      const ownersZombiesArray = await this.zombieInstance.zombies.call(0)
      assert.equal(ownersZombiesArray.name, 'zombie', 'could not retrieve a zombie from empty array')
    })

    it('zombieToOwner mapping', async () => {
      const zombieToOwner = await this.zombieInstance.zombieToOwner.call(0)
      assert.equal(zombieToOwner, owner, 'owner address not mapped to zombie id' )
    })
  })
});
