import virtualgs from '@classroomtechtools/virtualgs';
import test from 'ava';
import sinon from 'sinon';

const mocks = {
    "SpreadsheetApp": {
        "openById": () => {

        }
    }
};

test("Initialize with ID is required", async t => {
    const invoke = virtualgs('project', mocks);

    await t.throwsAsync(async function () {
        const Log = await invoke('Log');
    }, {instanceOf: Error});

    await t.notThrowsAsync(async function () {
        const Log = await invoke('Log', 'id');
    })
});

test("getData", async t => {
    mocks.SpreadsheetApp.openById = () => ({
        "getSheetByName": (name) => ({
            "getDataRange": () => ({
                "getValues": () => ["success"]
            })
        })
    });

    const invoke = virtualgs('project', mocks);
    const Log = await invoke('Log', 'id', 'sheet');
    const result = Log.getData();
    t.deepEqual(result, ["success"]);
});
