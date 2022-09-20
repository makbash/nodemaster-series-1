const { Router } = require("express");
const { MyError } = require("../libs/error/myError");

const router = Router()

const getData = (id) => {
    const response = {
        status: 'unknown',
        data: null,
    }

    if (isNaN(Number(id)) || Number(id) < 1) {
        throw new MyError('ID type mismatch')
    }

    // fake control for 404 handler
    if (id < 10) {
        response.data = {
            title: `Book-${id}`,
            detail: `Book-${id} detail`,
        }
    }

    return {
        ...response,
        status: 'success',
    }
}

router.get('/:id', async (req, res, next) => {
    try {
        const result = getData(req.params.id);

        if (!result?.data) {
            throw new MyError(`Book with id: ${req.params.id} not found.`)
        }

        return res.send(result);
    } catch (error) {
        // console.log(error ? Object.getOwnPropertyNames(error) : '--error--');
        return next(error)
    }
});

router.get('/', async (req, res, next) => {
    try {
        // throw new Error(`Books not found.`)

        res.json({
            status: 'success',
            data: [
                {
                    title: `Book-1`,
                    detail: `Book-1 detail`,
                },
                {
                    title: `Book-2`,
                    detail: `Book-2 detail`,
                },
                {
                    title: `Book-1`,
                    detail: `Book-3 detail`,
                }
            ]
        })
    } catch (error) {
        return next(error)
    }
});

module.exports = router;