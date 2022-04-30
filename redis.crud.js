((exportsRedis) => {
  const { createClient } = require("redis");
  return (async (exportsRedis) => {
    const client = createClient({
      host: "redis-server",
      port: 6379,
    });
    exportsRedis.createData = async (payload) => {
      const task = await client.set("task", payload);
      return task;
    };
    exportsRedis.getData = async () => {
      const task = await client.get("task");
      console.log(JSON.parse(task));
      return task;
    };
  })(exportsRedis);
})(module.exports);
