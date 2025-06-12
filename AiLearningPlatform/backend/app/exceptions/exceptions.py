from fastapi.responses import JSONResponse
from fastapi.requests import Request
from fastapi import status
from fastapi.exceptions import RequestValidationError
from fastapi import HTTPException
import logging

async def validation_exception_handler(request: Request, exc):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": exc.errors()}
    )


async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )



async def unhandled_exception_handler(request: Request, exc: Exception):
    logging.error(f"Unhandled error: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )