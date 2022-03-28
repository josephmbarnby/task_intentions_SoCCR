// Logging library
import consola from "consola";

// Request library
import axios from "axios";

/**
 * Compute class used to connect and submit jobs to a remote computing
 * resource.
 */
class Compute {
  private resourceURL: string;

  /**
   * Default constructor
   * @param {string} URL default URL of the computing resource
   */
  constructor(URL: string) {
    this.resourceURL = URL;
    consola.debug(`Querying URL: ${this.resourceURL}`);
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
    params: { participantID: string | number; participantResponses: string },
    onSuccess: (data: any) => void,
    onError: (data: any) => void
  ): void {
    const startTime = performance.now();

    axios
      .get(this.resourceURL, {
        params: params,
      })
      .then((response) => {
        // Attempt to handle the response and extract the data
        if (response["data"]) {
          // Pass the data to the callback
          onSuccess(response.data);
        } else {
          consola.warn("No data received");
        }
      })
      .catch((error) => {
        onError(error);
      })
      .then(() => {
        const endTime = performance.now();
        consola.info(
          `Compute complete after ${Math.round(endTime - startTime)}ms`
        );
      });
  }
}

export default Compute;
