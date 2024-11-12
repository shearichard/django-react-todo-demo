# Next.js Frontend Readme
*Within this project there are two frontends, this one, 'frontendnext', is based on Next.js, the other one, 'frontend', is based on vanilla React.js*

## Testing 

Testing within the Next.js front makes use of the [vitest](https://vitest.dev/) testing framework. The React Testing library , [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) is used to support the testing of React components. 

### Dumping output to file
If you want to dump the test output to file without getting a lot control characters mixed up in the output, this is one way.

```
npm run test  2>&1 | sed -r "s/\x1B\[[0-9;]*[mK]//g" > /tmp/foo.log
```

