export default {
  saltRounds: parseInt(process.env.SALT_ROUNDS as string) as number,
  jwtAccessTokenSecret: process.env.TOKEN_SECRET as string,
  frontendUrl: process.env.FRONTEND_BASEURL as string,
  googleProjectId: process.env.GOOGLE_PROJECT_ID as string,
  googleKeyfile: JSON.parse(process.env.GOOGLE_KEYFILE as string),
  googleBucketName: process.env.GOOGLE_BUCKET_NAME as string,
};
