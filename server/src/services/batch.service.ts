/**
 * Service that contains functions to process asynchronous concurrent operations.
 * Input is a function to process each item, number of asynchronous operations to run
 * concurrently, and a list or lists of items.
 * Output is a list of results from the function using Promise.
 */

/**
 * A function that takes in a variable amount of lists in parameters and
 * a function to process each item in a async batch with Promise.
 * @param fn The function of the request.
 * @param limit The limit of promise request that can be done at once.
 * @param lists List of params.
 * @returns The response of batch requests in a list{@link results}
 */
const batchMultiInput = async <T extends Array<unknown>>(
  fn: (...args: any[]) => any,
  limit: number,
  ...lists: T[]
) => {
  try {
    let results: any[] = [];

    const minLength = Math.min(...lists.map((list) => list.length));

    for (let start = 0; start < minLength; start += limit) {
      const end = start + limit > minLength ? minLength : start + limit;
      const slicedLists = await Promise.all(
        lists.map((list) => list.slice(start, end)),
      );

      const promises = Array.from({ length: end - start }, async (_, i) => {
        const elements = slicedLists.map((arr) => arr[i]);
        return fn(...elements);
      });

      const slicedResults = await Promise.all(promises);

      results = [...results, ...slicedResults];
    }

    return results;
  } catch (error) {
    console.error('An error occurred in one of the promises:', error);

    throw error;
  }
};

export { batchMultiInput };
