import { ValidatorPipe } from './validator.pipe';

describe('ValidatorPipe', () => {
  const label = 'email';
  const pipe = new ValidatorPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be valid', () => {
    expect(pipe.transform(null, 'email')).toBe(null);
  });

  it('should be invalid', () => {
    const err = new Error('Some error');
    expect(pipe.transform(err, label)).toBe(`${label} is invalid`);
  });
});
