import {PublisherOptions} from '@pact-foundation/pact-node';
import {Publisher} from '@pact-foundation/pact-node';
import {version} from '../package.json';

const publisherOptions: PublisherOptions = {
  pactBroker: 'https://jworks-ordina-pact-broker.herokuapp.com/',
  consumerVersion: version,
  pactBrokerUsername: '',
  pactBrokerPassword: '',
  tags: ['prod', 'test'],
  pactFilesOrDirs: [
    'pacts'
  ]
};
const publisher: Publisher = new Publisher(publisherOptions);

publisher.publish();
