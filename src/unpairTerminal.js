import { stringify } from "query-string";

export const unpairTerminal = (terminalId, key, password) =>
  new Promise((resolve, reject) => {
    const queryString = stringify({
      key,
      password,
      terminalId
    });
    const url = `https://econduitapp.com/services/api.asmx/unPairTerminal?${queryString}`;
    fetch(url)
      .then(response => {
        switch (response.status) {
          case 200:
            return response.json().then(responseJson => {
              resolve(responseJson);
            });
          default:
            return reject(
              new Error(
                `Unexpected response: ${response.status} ${
                  response.statusText
                }. For more information, please check the developer console.`
              )
            );
        }
      })
      .catch(reject);
  });

export const validateResponse = response => {
  const requiredKeys = ["Status", "ErrorMessage"];
  if (
    response == null ||
    typeof response !== "object" ||
    !requiredKeys.every(k => k in response)
  ) {
    throw new Error("Invalid response received from eConduit");
  }
};
