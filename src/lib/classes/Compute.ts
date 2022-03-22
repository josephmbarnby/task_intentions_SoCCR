// Logging library
import consola from 'consola';

// Request library
import axios from 'axios';

// Encryption
import {AES, enc} from 'crypto-js';

// Configuration
import {Configuration} from '@src/configuration';

/**
 * Compute class used to connect and submit jobs to a remote computing
 * resource.
 */
class Compute {
  private resourceURL: string;
  private useEncryption: boolean;

  /**
   * Default constructor
   * @param {string} URL default URL of the computing resource
   * @param {boolean} useEncryption toggle encryption on or off
   */
  constructor(URL: string, useEncryption = false) {
    this.resourceURL = URL;
    consola.debug(`Querying URL: ${this.resourceURL}`);

    if (typeof Configuration.key === 'string' &&
        Configuration.key !== '') {
      // If valid configuration has been given, set encryption
      this.useEncryption = useEncryption;
    } else {
      // Always disable encryption if not configured correctly
      this.useEncryption = false;

      if (useEncryption) {
        consola.warn(`Misconfigured encryption parameters`);
      }
    }

    consola.debug(`Encryption of requests: ${
      this.useEncryption ? 'on' : 'off'
    }`);
  }

  /**
   * Get the URL pointing to the compute resource and
   * its public APIs
   * @return {string}
   */
  public getResourceURL(): string {
    return this.resourceURL;
  }

  /**
   * Update the resource URL
   * @param {string} URL the URL to the computing resource
   */
  public setResourceURL(URL: string): void {
    this.resourceURL = URL;
  }

  /**
   * Submit a new computing job to the remote resource
   * @param {any} params request parameters
   * @param {function(data: any): void} onSuccess
   * @param {function(data: any): void} onError
   */
  public submit(
      params: {id: string | number, responses: string},
      onSuccess: (data: any) => void,
      onError: (data: any) => void
  ): void {
    // Assume the parameters are not encrypted, run encryption
    if (this.useEncryption) {
      consola.info(`Encrypting participant response data...`);
      params.responses =
          AES.encrypt(
              params.responses,
              Configuration.key).toString();
      consola.debug(`Generated ciphertext:`, params.responses);
    }

    const startTime = performance.now();
    axios.get(this.resourceURL, {
      params: params,
    }).then((response) => {
      // Attempt to handle the response and extract the data
      if (response['data']) {
        consola.debug(`Received response data:`, response.data);
        let computedPartner = response.data;

        // Extra step if we are decrypting
        if (this.useEncryption) {
          consola.info(`Decrypting computed partner data...`);
          const bytes = AES.decrypt(response.data, Configuration.key);
          computedPartner = bytes.toString(enc.Utf8);
        }

        // Pass the data to the callback
        onSuccess(computedPartner);
      } else {
        consola.warn('No data received');
      }
    }).catch((error) => {
      onError(error);
    }).then(() => {
      const endTime = performance.now();
      consola.info(
          `Compute complete after ${Math.round(endTime - startTime)}ms`);
    });
  }
}

export default Compute;
