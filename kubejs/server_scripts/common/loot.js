// priority: 100
LootJS.modifiers(event => {
    function addBossLoot(entity) {
        return event.addEntityLootModifier(entity)
            .addAlternativesLoot(
                LootEntry.of('kubejs:mysterious_trinket').when((c) => c.randomChance(0.8)),
            )
            .addAlternativesLoot(
                LootEntry.of('simplehats:hatbag_common').when((c) => c.randomChance(0.3)),
                LootEntry.of('simplehats:hatbag_uncommon').when((c) => c.randomChance(0.3)),
                LootEntry.of('simplehats:hatbag_rare').when((c) => c.randomChance(0.3)),
                LootEntry.of('simplehats:hatbag_epic').when((c) => c.randomChance(0.2)),
                LootEntry.of('simplehats:hatbag_summer').when((c) => c.randomChance(0.2)),
                LootEntry.of('simplehats:hatbag_easter').when((c) => c.randomChance(0.2)),
                LootEntry.of('simplehats:hatbag_festive').when((c) => c.randomChance(0.2)),
                LootEntry.of('simplehats:hatbag_halloween').when((c) => c.randomChance(0.2)),
            )
            .addAlternativesLoot(
                LootEntry.of('lightmanscurrency:coin_gold').when((c) => c.randomChance(0.5)),
                LootEntry.of('lightmanscurrency:coin_emerald').when((c) => c.randomChance(0.3)),
                LootEntry.of('lightmanscurrency:coin_diamond').when((c) => c.randomChance(0.1)),
            )
    }

    bossTypeList.forEach(entityId => {
        addBossLoot(entityId)
    })

    event.addEntityLootModifier('somebosses:ancient_wizard')
        .addLoot(LootEntry.of('kubejs:candy_pancreas').when((c) => c.randomChance(0.2)));
    event.addEntityLootModifier('somebosses:man_of_water')
        .addLoot(LootEntry.of('kubejs:magic_vision').when((c) => c.randomChance(0.2)));
    event.addEntityLootModifier('somebosses:flaming_berserker')
        .addLoot(LootEntry.of('kubejs:fire_gem').when((c) => c.randomChance(0.8)));
    event.addEntityLootModifier('goety:apostle')
        .addLoot('kubejs:pandora_inactive');
    event.addEntityLootModifier('bosses_of_mass_destruction:void_blossom')
        .addLoot('kubejs:secret_of_bloom')
        .addLoot('kubejs:flower_heart');
    event.addEntityLootModifier('bosses_of_mass_destruction:gauntlet')
        .apply(ctx => {
            if (ctx.player) {
                ctx.player.give(Item.of('kubejs:demon_eyeball'))
            }
        })
    event.addEntityLootModifier('minecraft:slime')
        .addLoot(LootEntry.of('kubejs:mini_slime').when(c => c.matchEquip('mainhand', 'minecraft:glass_bottle')));

    event.addLootTableModifier('dnl:entity/bee_swarm/reward')
        .addLoot(LootEntry.of('kubejs:candy_pancreas'));

    event.addEntityLootModifier('minecraft:witch')
        .addLoot(LootEntry.of('kubejs:magic_spine').when((c) => c.randomChance(0.05)));

    event.addLootTypeModifier(LootType.ENTITY)
        .removeLoot('@simplehats')
        .apply(ctx => {
            if (ctx.entity.isLiving() &&
                (ctx.entity.hasEffect('kubejs:glare_of_god') ||
                    ctx.entity.hasEffect('kubejs:gaze_of_god') ||
                    ctx.entity.hasEffect('kubejs:glimpse_of_god'))) {
                if (ctx.player) {
                    ctx.player.give(Item.of('kubejs:god_consciousness', { mobType: ctx.entity.getType() }))
                }
            }
        })

    event.addLootTypeModifier(LootType.CHEST)
        .anyStructure(['minecraft:ancient_city'], false)
        .addLoot(LootEntry.of('kubejs:unholy_grail').when((c) => c.randomChance(0.1)))
        .addLoot(LootEntry.of('kubejs:artist_wand').when((c) => c.randomChance(0.1)))

    event.addLootTypeModifier(LootType.CHEST)
        .removeLoot('@nameless_trinkets')
        .anyStructure(['#minecraft:village'], false)
        .addLoot(LootEntry.of('biomancy:healing_additive').when((c) => c.randomChance(0.25)))
        .addLoot(LootEntry.of('biomancy:breeding_stimulant').when((c) => c.randomChance(0.02)))
        .addLoot(LootEntry.of('biomancy:ageing_serum').when((c) => c.randomChance(0.02)))
        .addLoot(LootEntry.of('simplehats:hatbag_common').when((c) => c.randomChance(0.1)))
        .addLoot(LootEntry.of('simplehats:hatbag_uncommon').when((c) => c.randomChance(0.05)))
        .addLoot(LootEntry.of('bosses_of_mass_destruction:soul_star').when((c) => c.randomChance(0.02)))
        .addLoot(LootEntry.of('biomancy:ageing_serum').when((c) => c.randomChance(0.02)))
        .addLoot(LootEntry.of(Item.of('minecraft:potion', '{Potion:"minecraft:luck"}')).when((c) => c.randomChance(0.1)))
        .apply(ctx => {
            if (Math.random() < 0.12) {
                ctx.addLoot(getRandomPotionWares())
            }
            if (Math.random() < 0.03) {
                ctx.addLoot(getRandomChallengeWares())
            }
            if (Math.random() < 0.02) {
                ctx.addLoot(getRandomEggWares())
            }
            if (Math.random() < 0.08) {
                ctx.addLoot(getRandomSpecialWares())
            }
            if (Math.random() < 0.03) {
                ctx.addLoot(getRandomOrganWares())
            }
            if (Math.random() < 0.1) {
                ctx.addLoot(getRandomOreWares())
            }
        })


    event.addLootTypeModifier(LootType.CHEST)
        .anyDimension(['minecraft:the_nether'])
        .addLoot(LootEntry.of('kubejs:the_third_eye').when((c) => c.randomChance(0.02)))
        .addLoot(LootEntry.of('kubejs:redstone_furnace').when((c) => c.randomChance(0.02)))


    event.addLootTypeModifier(LootType.CHEST)
        .anyStructure(['#dnl:all_structure'], false)
        .addLoot(LootEntry.of('kubejs:ritual_catalyst').when((c) => c.randomChance(0.1)))
        .addLoot(LootEntry.of('kubejs:infinity_beats').when((c) => c.randomChance(0.02)))

    event.addLootTypeModifier(LootType.CHEST)
        .anyStructure(['#kubejs:graveyard'], false)
        .addLoot(LootEntry.of('kubejs:unholy_grail').when((c) => c.randomChance(0.01)))
        .addLoot(LootEntry.of('kubejs:illithids').when((c) => c.randomChance(0.005)))
        .addLoot(LootEntry.of('minecraft:diamond').when((c) => c.randomChance(0.1)))
        .addLoot(LootEntry.of('kubejs:mysterious_trinket').when((c) => c.randomChance(0.05)))
        .addLoot(LootEntry.of('lightmanscurrency:coin_gold').when((c) => c.randomChance(0.1)))
        .addLoot(LootEntry.of('irons_spellbooks:ancient_knowledge_fragment').when((c) => c.randomChance(0.01)))
        .addLoot(LootEntry.of('irons_spellbooks:arcane_essence').when((c) => c.randomChance(0.2)))
        .addLoot(LootEntry.of('irons_spellbooks:arcane_salvage').when((c) => c.randomChance(0.02)))
        .addLoot(LootEntry.of('minecraft:netherite_scrap').when((c) => c.randomChance(0.02)))
        .addLoot(LootEntry.of('hexerei:selenite_shard').when((c) => c.randomChance(0.05)))
        .addLoot(LootEntry.of('goety:empty_focus').when((c) => c.randomChance(0.05)))
        .addLoot(LootEntry.of('goety:spent_totem').when((c) => c.randomChance(0.03)))
        .addLoot(LootEntry.of('minecraft:iron_ingot').when((c) => c.randomChance(0.3)))
        .addLoot(LootEntry.of('minecraft:gold_ingot').when((c) => c.randomChance(0.1)))
})