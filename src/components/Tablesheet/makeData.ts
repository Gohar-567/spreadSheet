import { faker } from '@faker-js/faker'

export type SpreadSheet = {
    title: string
    jan: number
    feb: number
    mar: number
    apr: number
    may: number
    jun: number
    jul: number
    aug: number
    sep: number
    oct: number
    nov: number
    dec: number
    subRows?: SpreadSheet[]
}

const range = (len: number) => {
    const arr: number[] = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

const newSpreadSheet = (): SpreadSheet => {
    return {
        title: 'income',
        jan: faker.datatype.number(100),
        feb: faker.datatype.number(100),
        mar: faker.datatype.number(100),
        apr: faker.datatype.number(100),
        may: faker.datatype.number(100),
        jun: faker.datatype.number(100),
        jul: faker.datatype.number(100),
        aug: faker.datatype.number(100),
        sep: faker.datatype.number(100),
        oct: faker.datatype.number(100),
        nov: faker.datatype.number(100),
        dec: faker.datatype.number(100),
    }
}

export function makeData(...lens: number[]) {
    debugger
    const makeDataLevel = (depth = 0): SpreadSheet[] => {
        debugger
        const len = lens[depth]!;
        const rows = range(len).map((d): SpreadSheet => {
            return {
                ...newSpreadSheet(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
            };
        });
        // Calculate total row
        if (depth == 1) {
            const totalRow: SpreadSheet = {
                title: 'Total',
                jan: rows.reduce((sum, row) => sum + row.jan, 0),
                feb: rows.reduce((sum, row) => sum + row.feb, 0),
                mar: rows.reduce((sum, row) => sum + row.mar, 0),
                apr: rows.reduce((sum, row) => sum + row.apr, 0),
                may: rows.reduce((sum, row) => sum + row.may, 0),
                jun: rows.reduce((sum, row) => sum + row.jun, 0),
                jul: rows.reduce((sum, row) => sum + row.jul, 0),
                aug: rows.reduce((sum, row) => sum + row.aug, 0),
                sep: rows.reduce((sum, row) => sum + row.sep, 0),
                oct: rows.reduce((sum, row) => sum + row.oct, 0),
                nov: rows.reduce((sum, row) => sum + row.nov, 0),
                dec: rows.reduce((sum, row) => sum + row.dec, 0),
            };
            rows.push(totalRow);
        }
        return rows;
    };
    return makeDataLevel();
}
