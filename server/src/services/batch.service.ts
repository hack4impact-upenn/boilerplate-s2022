/**
 * Service that contains functions to process asynchronous concurrent operations.
 * Input is a list or lists of items, number of asynchronous operations to run concurrently, and a function to process each item.
 * Output is a list of results from the function using Promise.
 */

/**
 * A function that takes in a list of items and
 * a function to process each item in a async batch with Promise.
 * @param fn The function of the request.
 * @param limit The limit of promise request that can be done at once.
 * @param items List of items.
 * @returns The response of batch requests in a list{@link results}
 */
const batchReturnList = async (
  fn: (item: any) => Promise<any>,
  limit: number,
  items: Array<any>,
) => {
  try {
    let results: any[] = [];
    for (let start = 0; start < items.length; start += limit) {
      const end = start + limit > items.length ? items.length : start + limit;

      const slicedResults = await Promise.all(items.slice(start, end).map(fn));

      results = [...results, ...slicedResults];
    }

    return results;
  } catch (error) {
    console.error('An error occurred in one of the promises:', error);

    throw error;
  }
};

/**
 * A function that takes in a list of items and
 * a function to process each item in a async batch with Promise.
 * @param fn The function of the request.
 * @param limit The limit of promise request that can be done at once.
 * @param items List of items.
 * @returns void
 */
const batchReturnVoid = async (
  fn: (item: any) => void,
  limit: number,
  items: Array<any>,
) => {
  try {
    for (let start = 0; start < items.length; start += limit) {
      const end = start + limit > items.length ? items.length : start + limit;

      await Promise.all(items.slice(start, end).map(fn));
    }

    return;
  } catch (error) {
    console.error('An error occurred in one of the promises:', error);

    throw error;
  }
};

/**
 * A function that takes in a variable amount of lists in parameters and
 * a function to process each item in a async batch with Promise.
 * @param fn The function of the request.
 * @param limit The limit of promise request that can be done at once.
 * @param lists List of params.
 * @returns The response of batch requests in a list{@link results}
 */
const batchReturnMultiList = async <T extends Array<unknown>>(
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

/**
 * A function that takes in a variable amount of lists in parameters and
 * a function to process each item in a async batch with Promise.
 * @param lists List of params.
 * @param limit The limit of promise request that can be done at once.
 * @param fn The function of the request.
 * @returns void
 */
const batchReturnMultiListVoid = async <T extends Array<unknown>>(
  fn: (...args: any[]) => void,
  limit: number,
  ...lists: T[]
) => {
  try {
    const minLength = Math.min(...lists.map((list) => list.length));

    for (let start = 0; start < minLength; start += limit) {
      const end = start + limit > minLength ? minLength : start + limit;
      const slicedLists = await Promise.all(
        lists.map((list) => list.slice(start, end)),
      );

      const promises = Array.from({ length: end - start }, async (_, i) => {
        // Collect elements from each array at index `i`
        const elements = slicedLists.map((arr) => arr[i]);
        // Apply the function `fn` to these elements
        return fn(...elements);
      });

      await Promise.all(promises);
    }

    return;
  } catch (error) {
    console.error('An error occurred in one of the promises:', error);

    throw error;
  }
};

export {
  batchReturnList,
  batchReturnVoid,
  batchReturnMultiList,
  batchReturnMultiListVoid,
};
