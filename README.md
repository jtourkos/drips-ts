# DripsTS (WIP)

Getting familiar with the [Drips](https://app.drips.network/explore) protocol by building a TypeScript client. 😊
This is a simple project for educational purposes only. 🤓
**Original code was taken from the [Drips repositories](https://github.com/orgs/radicle-dev/repositories?q=drips&type=all&language=&sort=).**

## Examples

### Creating a community

Create a test signer:

```js
const signer = await Wallet.fromMnemonic(process.env.TEST_MNEMONIC!).connect(
new ethers.providers.JsonRpcProvider(process.env.INFURA!)
);
```

Create a Radicle Registry Client instance:

```js
const radicleRegistry = new RadicleRegistryClient(signer, NetworkConfig.Rinkeby);
```

Create your community:

```js
const communityId = await radicleRegistry.createNewCommunity(
 {
  name: 'My Community Name',
  symbol: 'MCS',
  metadata: {
   description: 'Testing drips on TS'
  }
 },
 {
  limit: 100,
  minAmount: 10,
  intervalInSecs: ONE_MONTH_IN_SECS
 }
);
```

Create a Radicle SubGraph Client and read the community details:

```js
const dripsSubGraphClient = new RadicleSubGraphClient(process.env.SUBGRAPH!);

const community = await dripsSubGraphClient.getCommunityById(communityId);

console.log(JSON.stringify(community));
```

Take a look at the examples.ts for the implementation.

## How to run the examples

Install the dependencies:

```
npm install
```

Build (from the root of the project):

```
npx tsc examples.ts --outDir dist
```

Run the example:

```
node dist/examples.js
```

## Clients

- DripsClient (TODO)
- RadicleRegistryClient (Started)
- RadicleSubGraphClient (Started)
- Erc20DripsHubClient (TODO)
- ...

The idea is to create a separate client package for each of the Drips protocol for better modularity,
and have a "DripsClient" meta-package (wrapper) that exposes _all_ the functionality.
(To think about it. Is this a valid real-world scenario or just overkill?)

## Generate types with [TypeChain](https://github.com/dethcrypto/TypeChain)

Types are generated with From mainnet ABIs by running:

```
npx typechain --glob "src/contracts/\*_/_.json" --target ethers-v5 --out-dir src/contracts/generated --show-stack-traces

```

## TODOs

- Add unit tests so that we can sleep at nights.
- Add documentation (both in code and [typedoc](https://typedoc.org/)).
- Take care of the TODOs in the code.
- Create separate packages for each client (?) when done.
- Write a proper Wiki with examples.
- Encapsulate the generated code (Factories, etc.) and expose only the necessary APIs.
- ...
