declare module 'random-number-csprng' {
  const randomNumberCsprng: (min: number, max: number) => Promise<number>;

  export default randomNumberCsprng;
}
