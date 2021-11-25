import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(
    parseInt(process.env.DEFAULT_SALT_ROUNDS, 10) || 10
  );
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

export const checkHashedPassword = async (
  password: string | Buffer,
  hash: string
) => bcrypt.compare(password, hash);
