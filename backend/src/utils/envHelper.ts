//created a helper function for getting multiple env vairables at once
export const getEnv = (envArray: string[]): Record<string, string> => {
  //passing an array of names of env variables I want
  const missing = envArray.filter((key) => !process.env[key]); //will return an array of env that are not caught

  if (missing.length > 0) {
    //throw error
    console.error("❌ Missing required environment variables:");
    missing.forEach((val) => console.error(`   -${val}`));
    process.exit(1);
  }

  console.log(`✅ ${envArray.length} validated`);

  const entries = envArray.map((key) => [key, process.env[key]]);
  const objectFormat = Object.fromEntries(entries);
  return objectFormat;
};
