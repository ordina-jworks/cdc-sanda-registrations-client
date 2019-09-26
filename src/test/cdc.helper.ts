import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Provider} from '@angular/core';
import {TestModuleMetadata} from '@angular/core/testing';

export const createCDCModule = (providers: Array<Provider>): TestModuleMetadata => {
  return {
    imports: [HttpClientModule],
    providers: [
      HttpClient,
      ...providers
    ]
  };
};
