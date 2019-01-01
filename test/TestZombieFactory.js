const ZombieFactory = artifacts.require('./ZombieFactory.sol');

contract('ZombieFactory', ([_, owner, ...accounts]) => {

  beforeEach(async () => {
    this.zombieInstance = await ZombieFactory.new({ from: owner });
    await this.zombieInstance.createRandomZombie('zombie', { from: owner })
  })

  it('can createRandomZombie', async () => {
    assert.equal(await this.zombieInstance.owner(), owner, 'not owned by owner')
  });

  describe('storage objects', () => {
    it('[zombies] with zombie in it', async () => {
      const ownersZombiesArray = await this.zombieInstance.zombies.call(0)
      assert.equal(ownersZombiesArray.name, 'zombie', 'could not retrieve a zombie from empty array')
    })

    it('zombieToOwner mapping', async () => {
      const zombieToOwner = await this.zombieInstance.zombieToOwner.call(0)
      assert.equal(zombieToOwner, owner, 'owner address not mapped to zombie id' )
    })
  })
});
