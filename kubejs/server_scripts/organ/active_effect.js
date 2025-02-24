// priority: 10
const playerAttributeMap = new Map();

/**
 * 全局函数，用于更新玩家的激活效果状态
 * @param {Internal.Player} player 
 */

global.updatePlayerActiveStatus = player => {
    let typeMap = getPlayerChestCavityTypeMap(player);
    let uuid = String(player.getUuid());
    let attributeMap = new Map();
    player.persistentData.putInt(resourceCountMax, defaultResourceMax)
    // 激活状态根据Tag区分并遍历可以用于激活的器官方法
    if (typeMap.has('kubejs:active')) {
        typeMap.get('kubejs:active').forEach(organ => {
            organActiveStrategies[organ.id](player, organ, attributeMap)
        })
    }
    let onlySet = new Set()
    if (typeMap.has('kubejs:active_only')) {
        typeMap.get('kubejs:active_only').forEach(organ => {
            if (!onlySet.has(organ.id)) {
                onlySet.add(organ.id)
                organActiveOnlyStrategies[organ.id](player, organ, attributeMap)
            }
        })
    }
    playerAttributeMap.set(uuid, attributeMap);
    attributeMap.forEach((value, key, map) => {
        player.modifyAttribute(global.ATTRIBUTE_MAP[key].key, key, value, global.ATTRIBUTE_MAP[key].operation);
    })
    let maxResourceCount = player.persistentData.getInt(resourceCountMax) ?? defaultResourceMax
    updateResourceMaxCount(player, maxResourceCount)
}

/**
 * 获取玩家属性表
 * @param {Internal.Player} player 
 * @returns {Map}
 */

function getPlayerAttributeMap(player) {
    let uuid = String(player.getUuid());
    if (playerAttributeMap.has(uuid)) {
        return playerAttributeMap.get(uuid);
    }
    return new Map();
}

/**
 * 设置玩家属性表
 * @param {Internal.player} player 
 * @param {Map} attriMap 
 */
function setPlayerAttributeMap(player, attriMap) {
    let uuid = String(player.getUuid());
    playerAttributeMap.set(uuid, attriMap)
}


/**
 * 清除玩家所有已经添加的属性
 * @param {Internal.Player} player 
 * @returns
 */
function clearAllActivedModify(player) {
    let attributeMap = getPlayerAttributeMap(player)
    attributeMap.forEach((value, key, map) => {
        player.removeAttribute(global.ATTRIBUTE_MAP[key].key, global.ATTRIBUTE_MAP[key].name);
    })
    player.persistentData.putInt(resourceCountMax, defaultResourceMax)
}

/**
 * 清除玩家所有已经添加的属性
 * @param {Map} attributeMap
 * @param {attribute} attribute
 * @param {number} modifyValue
 * @returns
 */
function attributeMapValueAddition(attributeMap, attribute, modifyValue) {
    if (attributeMap.has(attribute.name)) {
        modifyValue = modifyValue + attributeMap.get(attribute.name)
    }
    attributeMap.set(attribute.name, modifyValue)
}


/**
 * 器官激活策略
 * @constant
 * @type {Object<string,function(Internal.Player, organ, Map):void>}
 */
const organActiveStrategies = {
    'kubejs:health_appendix': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        if (typeMap.has('kubejs:appendix')) {
            let value = typeMap.get('kubejs:appendix').length * 1
            attributeMapValueAddition(attributeMap, global.HEALTH_UP, value)
        }
    },
    'kubejs:rose_quartz_heart': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        if (typeMap.has('kubejs:machine')) {
            let value = typeMap.get('kubejs:machine').length * 2
            attributeMapValueAddition(attributeMap, global.HEALTH_UP, value)
        }

        if (typeMap.has('kubejs:rose')) {
            let value = typeMap.get('kubejs:rose').length * 1
            attributeMapValueAddition(attributeMap, global.ATTACK_UP, value)
        }
    },
    'kubejs:revolution_cable': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        if (typeMap.has('kubejs:revolution')) {
            let value = typeMap.get('kubejs:revolution').length * 1
            attributeMapValueAddition(attributeMap, global.HEALTH_UP, value)
        }
    },
    'kubejs:magic_vision': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.SPELL_POWER, 0.2)
    },
    'kubejs:love_between_lava_and_ice': function (player, organ, attributeMap) {
        let itemMap = getPlayerChestCavityItemMap(player);
        if (itemMap.has('minecraft:blue_ice')) {
            let iceMuti = itemMap.get('minecraft:blue_ice').length * 0.1
            attributeMapValueAddition(attributeMap, global.ICE_SPELL_POWER, iceMuti)
        }
        if (itemMap.has('minecraft:magma_block')) {
            let fireMuti = itemMap.get('minecraft:magma_block').length * 0.1
            attributeMapValueAddition(attributeMap, global.FIRE_SPELL_POWER, fireMuti)
        }
    },
    'kubejs:stomach_tumor': function (player, organ, attributeMap) {
        let posMap = getPlayerChestCavityPosMap(player);
        let pos = organ.Slot
        let count = 0
        eightDirectionList.forEach(direction => {
            let currentPos = lookPos(direction, pos)
            if (posMap.has(currentPos) && posMap.get(currentPos).id == organ.id) {
                count++
            }
        })
        if (count > 2) {
            attributeMapValueAddition(attributeMap, global.HEALTH_UP, 6)
        }
    },
    'kubejs:leviathan_rib': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.ARMOR_TOUGHNESS, 2)
    },
    'kubejs:holy_eyeball': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.CRITICAL_HIT, 0.05)
        attributeMapValueAddition(attributeMap, global.HOLY_SPELL_DAMAGE, 0.2)
    },
    'kubejs:hamimelon_organ': function (player, organ, attributeMap) {
        let posMap = getPlayerChestCavityPosMap(player);
        let pos = organ.Slot
        let count = 0
        eightDirectionList.forEach(direction => {
            let currentPos = lookPos(direction, pos)
            if (posMap.has(currentPos) && Item.of(posMap.get(currentPos).id).hasTag('kubejs:food')) {
                count++
            }
        })
        if (count > 0) {
            attributeMapValueAddition(attributeMap, global.HEALTH_UP, 2 * count)
        }
    },
    'kubejs:mini_slime': function (player, organ, attributeMap) {
        let pos = organ.Slot
        let rowOffset = Math.abs(Math.floor(pos / 9) - 1)
        let lineOffset = Math.abs(pos % 9 - 4)
        attributeMapValueAddition(attributeMap, global.HEALTH_UP, 2 * (lineOffset + rowOffset))
    },
    'kubejs:desire_of_midas': function (player, organ, attributeMap) {
        let maxCount = player.persistentData.getInt(resourceCountMax) ?? defaultResourceMax
        player.persistentData.putInt(resourceCountMax, maxCount + 100)
    },
    'kubejs:redstone_furnace': function (player, organ, attributeMap) {
        let maxCount = player.persistentData.getInt(resourceCountMax) ?? defaultResourceMax
        player.persistentData.putInt(resourceCountMax, maxCount + 100)
    },
    'kubejs:aesegull_rib_right': function (player, organ, attributeMap) {
        let posMap = getPlayerChestCavityPosMap(player);
        let pos = organ.Slot
        // 取对称位置坐标
        let opPos = getOppoPos(pos)
        if (posMap.has(opPos) && posMap.get(opPos).id == 'kubejs:aesegull_rib_left') {
            attributeMapValueAddition(attributeMap, global.ARMOR, 3)
        }
    },
    'kubejs:aesegull_rib_left': function (player, organ, attributeMap) {
        let posMap = getPlayerChestCavityPosMap(player);
        let pos = organ.Slot
        // 取对称位置坐标
        let opPos = getOppoPos(pos)
        if (posMap.has(opPos) && posMap.get(opPos).id == 'kubejs:aesegull_rib_right') {
            attributeMapValueAddition(attributeMap, global.ARMOR_TOUGHNESS, 3)
        }
    },
    'kubejs:blood_moon_wand': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.BLOOD_SPELL_DAMAGE, 0.3)
    },
    'kubejs:huge_lung': function (player, organ, attributeMap) {
        let posMap = getPlayerChestCavityPosMap(player);
        if (checkBox22OrganSame(posMap, organ)) { return }
        attributeMapValueAddition(attributeMap, global.HEALTH_UP, -5)
    },
    'kubejs:huge_muscle': function (player, organ, attributeMap) {
        let posMap = getPlayerChestCavityPosMap(player);
        if (checkBox22OrganSame(posMap, organ)) { return }
        attributeMapValueAddition(attributeMap, global.HEALTH_UP, -5)
    },
    'kubejs:huge_heart': function (player, organ, attributeMap) {
        let posMap = getPlayerChestCavityPosMap(player);
        if (checkBox22OrganSame(posMap, organ)) { return }
        attributeMapValueAddition(attributeMap, global.HEALTH_UP, -10)
    },
    'kubejs:huge_intestine': function (player, organ, attributeMap) {
        let posMap = getPlayerChestCavityPosMap(player);
        if (checkBox22OrganSame(posMap, organ)) { return }
        attributeMapValueAddition(attributeMap, global.HEALTH_UP, -5)
    },
    'kubejs:huge_rib': function (player, organ, attributeMap) {
        let posMap = getPlayerChestCavityPosMap(player);
        if (checkBox22OrganSame(posMap, organ)) { return }
        attributeMapValueAddition(attributeMap, global.HEALTH_UP, -5)
    },
    'kubejs:huge_spine': function (player, organ, attributeMap) {
        let posMap = getPlayerChestCavityPosMap(player);
        if (checkBox22OrganSame(posMap, organ)) { return }
        attributeMapValueAddition(attributeMap, global.HEALTH_UP, -5)
    },
    'kubejs:huge_spleen': function (player, organ, attributeMap) {
        let posMap = getPlayerChestCavityPosMap(player);
        if (checkBox22OrganSame(posMap, organ)) { return }
        attributeMapValueAddition(attributeMap, global.HEALTH_UP, -5)
    },
    'kubejs:huge_stomach': function (player, organ, attributeMap) {
        let posMap = getPlayerChestCavityPosMap(player);
        if (checkBox22OrganSame(posMap, organ)) { return }
        attributeMapValueAddition(attributeMap, global.HEALTH_UP, -5)
    },
    'kubejs:huge_kidney': function (player, organ, attributeMap) {
        let posMap = getPlayerChestCavityPosMap(player);
        if (checkBox22OrganSame(posMap, organ)) { return }
        attributeMapValueAddition(attributeMap, global.HEALTH_UP, -5)
    },
    'kubejs:huge_liver': function (player, organ, attributeMap) {
        let posMap = getPlayerChestCavityPosMap(player);
        if (checkBox22OrganSame(posMap, organ)) { return }
        attributeMapValueAddition(attributeMap, global.HEALTH_UP, -5)
    },
    'kubejs:huge_appendix': function (player, organ, attributeMap) {
        let posMap = getPlayerChestCavityPosMap(player);
        if (checkBox22OrganSame(posMap, organ)) { return }
        attributeMapValueAddition(attributeMap, global.HEALTH_UP, -5)
    },
    'kubejs:bad_ink': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        if (typeMap.has('kubejs:magic')) {
            let value = typeMap.get('kubejs:magic').length * 30
            attributeMapValueAddition(attributeMap, global.MAX_MANA, value)
        }
    },
};

/**
 * 器官激活唯一策略
 * @constant
 * @type {Object<string,function(Internal.Player, organ, Map):void>}
 */
const organActiveOnlyStrategies = {
    'kubejs:telescopic_arm': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.REACH_DISTANCE, 1)
    },
    'kubejs:telescopic_tool_arm': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.REACH_DISTANCE, 2)
    },
    'kubejs:telescopic_attack_arm': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.ATTACK_RANGE, 1)
    },
    'kubejs:nether_star_shard': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.CRITICAL_HIT, 0.1)
    },
    'kubejs:wrath_shard': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.CRITICAL_HIT, -0.8)
        attributeMapValueAddition(attributeMap, global.CRITICAL_DAMAGE, 3)
    },
    'kubejs:sloth_shard': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.KNOCKBACK_RESISTANCE, 0.8)
    },
    'kubejs:envy_shard': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.CRITICAL_DAMAGE, 1)
    },
    'kubejs:gluttony_shard': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.REGENERATION, 0.5)
    },
    'kubejs:lust_shard': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.MAX_MANA, 100)
    },
    'kubejs:pride_shard': function (player, organ, attributeMap) {
        attributeMapValueAddition(attributeMap, global.SUMMON_DAMAGE, 0.3)
    },
    'kubejs:infinity_force': function (player, organ, attributeMap) {
        if (organ.tag?.forgeTimes) {
            let value = organ.tag.forgeTimes * 2
            attributeMapValueAddition(attributeMap, global.ATTACK_UP, value)
        }
    },
    'kubejs:redstone_chipset': function (player, organ, attributeMap) {
        let typeMap = getPlayerChestCavityTypeMap(player);
        if (typeMap.has('kubejs:machine')) {
            let value = Math.max(typeMap.get('kubejs:machine').length * 0.02, 0.2)
            attributeMapValueAddition(attributeMap, global.CRITICAL_HIT, value)
        }
        attributeMapValueAddition(attributeMap, global.CRITICAL_DAMAGE, 0.3)
    },
    'kubejs:king_of_stomach': function (player, organ, attributeMap) {
        let posMap = getPlayerChestCavityPosMap(player);
        let healthUp = 0
        let attackUp = 0
        let manaUp = 0
        let onlySet = new Set()
        posMap.forEach((value, key) => {
            if (value) {
                let foodPro = Item.of(value.id).getFoodProperties(player)
                if (foodPro) {
                    let nutrition = foodPro.getNutrition()
                    let staturation = foodPro.getSaturationModifier() * nutrition
                    if (!onlySet.has(organ.id)) {
                        healthUp = healthUp + nutrition / 2
                        attackUp = attackUp + staturation / 3
                        onlySet.add(organ.id)
                        if (foodPro.getEffects().length) {
                            manaUp = manaUp + foodPro.getEffects().length * 20
                        }
                    }
                    healthUp = healthUp + nutrition / 4
                    attackUp = attackUp + staturation / 5
                } else {
                    healthUp = healthUp - 1
                    attackUp = attackUp - 0.2
                }
            }
        })
        attributeMapValueAddition(attributeMap, global.HEALTH_UP, Math.floor(healthUp))
        attributeMapValueAddition(attributeMap, global.ATTACK_UP, attackUp)
        attributeMapValueAddition(attributeMap, global.MAX_MANA, Math.floor(manaUp))
    },
}



function checkBox22OrganSame(posMap, organ) {
    let pos = organ.Slot
    for (let i = 0; i < box22DirectionList.length; i++) {
        let flag = true
        let directionList = box22DirectionList[i]
        for (let j = 0; j < directionList.length; j++) {
            let currentPos = lookPos(directionList[j], pos)
            if (!(posMap.has(currentPos) && posMap.get(currentPos).id == organ.id)) {
                flag = false
                break
            }
        }
        if (flag) {
            return true
        }
    }
    return false
}