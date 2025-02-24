// priority: 10
BlockEvents.broken(event => {
    let player = event.player;
    if (!player) return;

    let typeMap = getPlayerChestCavityTypeMap(player);
    if (typeMap.has('kubejs:break')) {
        typeMap.get('kubejs:break').forEach(organ => {
            organBlockBrokenStrategies[organ.id](event, organ)
        })
    }
    let onlySet = new Set()
    if (typeMap.has('kubejs:break_only')) {
        typeMap.get('kubejs:break_only').forEach(organ => {
            if (!onlySet.has(organ.id)) {
                onlySet.add(organ.id)
                organBlockBrokenOnlyStrategies[organ.id](event, organ)
            }
        })
    }
})

/**
 * 器官方块破坏策略
 * @constant
 * @type {Object<string,function(Internal.BlockBrokenEventJS, organ):void>}
 */
const organBlockBrokenStrategies = {
    'kubejs:diamond_bottle': function (event, organ) {
        let player = event.player
        let count = 1;
        if (player.persistentData.contains(resourceCount)) {
            count = player.persistentData.getInt(resourceCount) + count;
        }
        if (Math.random() < 0.5) {
            updateResourceCount(player, count)
        }
    },
};

/**
 * 器官方块破坏唯一策略
 * @constant
 * @type {Object<string,function(Internal.BlockBrokenEventJS, organ):void>}
 */
const organBlockBrokenOnlyStrategies = {
    'kubejs:silk_for_cutting': function (event, organ) {
        if (!event.block.item.hasTag('forge:glass')) {
            return
        }
        event.block.popItem(event.block.getItem())
        event.block.set('minecraft:air')
        event.cancel()
    },
    'kubejs:ore_lung': function (event, organ) {
        if (!event.block.item.hasTag('forge:stone')) {
            return
        }
        let player = event.player
        let itemMap = getPlayerChestCavityItemMap(player)
        let count = 1;
        if (player.persistentData.contains(resourceCount)) {
            count = player.persistentData.getInt(resourceCount) + count;
        }
        if (count >= 64 && Math.random() <= 0.03) {
            let luck = Math.max(player.getLuck(), 1)
            if (luck > 5) {
                player.give(Item.of('kubejs:rare_mineral_cluster').withCount(Math.max(Math.floor(5 - 30 / luck), 1) * itemMap.get('kubejs:ore_lung').length))
            }
            player.give(Item.of('kubejs:common_mineral_cluster').withCount(Math.max(Math.floor(5 - 5 / luck), 1) * itemMap.get('kubejs:ore_lung').length))
            count = count - 64
        }
        updateResourceCount(player, count)
    },
    'kubejs:desire_of_midas': function (event, organ) {
        let player = event.player
        if (!player.persistentData.contains(resourceCount)) {
            return
        }
        let count = player.persistentData.getInt(resourceCount);
        if (count > 150 && Math.random() < 0.02) {
            event.block.popItem('minecraft:gold_block')
            event.block.set('minecraft:air')
            updateResourceCount(player, count - 100)
            event.cancel()
        }
        if (count > 500 && Math.random() < 0.01) { 

        }
    },
}