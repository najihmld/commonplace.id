import { glob } from 'glob';
import path from 'path';

const COMPONENTS_DIR = 'src/components/common';
const TEST_DIR = path.join(COMPONENTS_DIR, '__test__');

async function findUntestedCommonComponents() {
  const componentFiles = await glob(`${COMPONENTS_DIR}/*.tsx`);
  const testFiles = await glob(`${TEST_DIR}/*.test.tsx`);

  const testedBaseNames = testFiles.map((file) =>
    path.basename(file).replace('.test.tsx', ''),
  );

  const untested = componentFiles.filter((file) => {
    const base = path.basename(file).replace('.tsx', '');
    return !testedBaseNames.includes(base);
  });

  if (untested.length === 0) {
    console.log('✅ All components have test files.');
  } else {
    console.log('❌ Components without tests:\n');
    untested.forEach((file) => console.log('•', file));
  }
}

findUntestedCommonComponents();
