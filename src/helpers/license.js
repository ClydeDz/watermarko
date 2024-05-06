export const checkLicense = async (licenseKey) => {
  const rawResponse = await fetch(
    process.env.REACT_APP_LICENSE_VERIFICATION_URL,
    {
      method: "POST",
      body: JSON.stringify({
        product_id: process.env.REACT_APP_PRODUCT_ID,
        license_key: licenseKey,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  ).catch((error) => console.error(error));

  const content = await rawResponse.json();
  return content.success;
};
