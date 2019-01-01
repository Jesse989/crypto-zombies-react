const ZombieOwnership = artifacts.require('./ZombieOwnership.sol');

contract('ZombieOwnership', ([_, owner, ...accounts]) => {

  beforeEach(async () => {
    this.zombieInstance = await ZombieOwnership.new({ from: owner });
  })

  it('has a owner', async () => {
    assert.equal(await this.zombieInstance.owner(), owner, 'not owned by owner')
  });

  describe('get zombie by owner', () => {
    it('gets an array of zombie ids', async () => {
      await this.zombieInstance.createRandomZombie('zombie', { from: owner })
      const ownersZombiesArray = await this.zombieInstance.getZombiesByOwner(owner)
      assert.equal(ownersZombiesArray[0], 0, 'could not retrieve a zombie from empty array')
    })
  })
});
