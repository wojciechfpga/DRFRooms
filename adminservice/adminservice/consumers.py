import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer

class HelloConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        while True:
            await self.send(text_data="Hello from WebSocket!")
            await asyncio.sleep(5)
