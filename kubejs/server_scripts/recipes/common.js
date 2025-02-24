ServerEvents.recipes(event => {
    event.remove({ mod: 'nameless_trinkets' })
    event.remove({ mod: 'somebosses' })
    event.remove({ output: 'supplementaries:candy' })
    event.remove({ output: 'moblassos:hostile_lasso' })
    event.remove({ output: 'majobroom:majo_hat' })
    event.remove({ output: 'majobroom:majo_cloth' })
    event.remove({ output: 'morebows:ender_bow' })
    event.remove({ output: 'lightmanscurrency:coinmint' })
    event.remove({ output: 'irons_spellbooks:dev_staff' })
    event.remove({ output: 'goety:warped_wartful_egg' })
    event.remove({ output: 'gateways:gate_pearl' })
    event.remove({ output: 'cataclysm:meat_shredder' })
    
    event.shaped('cataclysm:meat_shredder', [
        ['', 'minecraft:nether_star', 'goety:philosophers_stone'],
        ['', 'cataclysm:witherite_ingot', 'minecraft:nether_star'],
        ['cataclysm:witherite_ingot', '', '']
    ])

    event.shaped('minecraft:end_portal_frame', [
        ['hexerei:selenite_shard', 'hexerei:wax_blend', 'hexerei:selenite_shard'],
        ['minecraft:end_stone', 'minecraft:end_crystal', 'minecraft:end_stone'],
        ['#forge:obsidian', '#forge:obsidian', '#forge:obsidian']
    ])

    event.shaped('minecraft:elytra', [
        ['', 'alexsmobs:banana_slug_slime', ''],
        ['minecraft:phantom_membrane', 'createaddition:gold_wire', 'minecraft:phantom_membrane'],
        ['', 'alexsmobs:banana_slug_slime', '']
    ])

    event.shaped('kubejs:silk_for_cutting', [
        ['minecraft:glass', '#forge:string', 'minecraft:glass'],
        ['#forge:string', '#forge:dusts/glowstone', '#forge:string'],
        ['minecraft:glass', '#forge:string', 'minecraft:glass']
    ])

    event.shaped('kubejs:blood_extractor', [
        ['create:iron_sheet', 'create:iron_sheet', 'create:iron_sheet'],
        ['create:iron_sheet', 'chestcavity:chest_opener', '#forge:dusts/glowstone'],
        ['minecraft:glass_pane', 'chestcavity:golem_cable', 'create:iron_sheet']
    ])

    event.shapeless('summoningrituals:altar', ['minecraft:wither_skeleton_skull', '#hexerei:candles', '#hexerei:candles', '#hexerei:candles', 'createaddition:electrum_sheet', 'minecraft:lectern'])

    event.shapeless('kubejs:disenchantment_paper', ['minecraft:enchanted_book', 'alexsmobs:mysterious_worm', 'goety:unholy_blood'])

    event.shaped('irons_spellbooks:copper_spell_book', [
        ['kubejs:stardust_fragment', 'kubejs:stardust_fragment', 'kubejs:stardust_fragment'],
        ['kubejs:stardust_fragment', '#kubejs:isb_spell_book', 'kubejs:stardust_fragment'],
        ['kubejs:stardust_fragment', 'kubejs:stardust_fragment', 'kubejs:stardust_fragment']])
        .modifyResult((grid, stack) => {
            let spellBook = grid.find('#kubejs:isb_spell_book', 0)
            if (spellBook.nbt.ISB_spellbook.getInt('starLightEnhance') == 1) {
                return null;
            }
            spellBook.nbt.ISB_spellbook.putInt('spellSlots', spellBook.nbt.ISB_spellbook.getInt('spellSlots') + 2)
            spellBook.nbt.ISB_spellbook.putInt('starLightEnhance', 1)
            stack = spellBook
            return stack;
        });

    event.shaped('irons_spellbooks:scroll', [
        ['kubejs:stardust_fragment', 'kubejs:stardust_fragment', 'kubejs:stardust_fragment'],
        ['kubejs:stardust_fragment', 'irons_spellbooks:scroll', 'kubejs:stardust_fragment'],
        ['kubejs:stardust_fragment', 'kubejs:stardust_fragment', 'kubejs:stardust_fragment']])
        .modifyResult((grid, stack) => {
            let spellBook = grid.find('irons_spellbooks:scroll', 0)
            spellBook.nbt.ISB_spell.putInt('level', spellBook.nbt.ISB_spell.getInt('level') + 1)
            stack = spellBook
            return stack;
        });

    event.shapeless('kubejs:paradise_regained', ['kubejs:god_consciousness', 'kubejs:god_consciousness', 'kubejs:god_consciousness'])
        .modifyResult((grid, stack) => {
            let nbt1 = grid.find('kubejs:god_consciousness', 0).nbt
            let nbt2 = grid.find('kubejs:god_consciousness', 1).nbt
            let nbt3 = grid.find('kubejs:god_consciousness', 2).nbt
            if ((nbt1?.mobType != nbt2?.mobType) && (nbt2?.mobType != nbt3?.mobType) && (nbt3?.mobType != nbt1?.mobType)) {
                stack = Item.of('kubejs:paradise_regained')
                return stack;
            }
            return null;
        });

    event.shapeless('kubejs:infinity_force', ['kubejs:infinity_force', 'kubejs:infinity_force'])
        .modifyResult((grid, stack) => {
            let item1 = grid.find('kubejs:infinity_force', 0)
            let item2 = grid.find('kubejs:infinity_force', 1)
            if ((item1.nbt?.forgeTimes ?? 0) == (item2.nbt?.forgeTimes ?? 0)) {
                let forgeTimes = item1.nbt?.forgeTimes ?? 0
                stack = Item.of('kubejs:infinity_force', { forgeTimes: forgeTimes + 1 })
                return stack;
            }
            return null;
        });

    event.shapeless('kubejs:lucky_cookie', ['minecraft:paper', 'minecraft:cookie'])
    event.shapeless('kubejs:eye_of_village', ['minecraft:ender_pearl', 'minecraft:emerald'])
    event.shapeless('kubejs:eye_of_dnl', ['minecraft:ender_pearl', 'minecraft:gold_ingot'])
    event.shapeless('kubejs:eye_of_fortress', ['minecraft:ender_pearl', 'minecraft:magma_cream'])
    event.shapeless('kubejs:mysterious_trinket', ['nameless_trinkets:explosion_proof_jacket'])
    event.shapeless('kubejs:mysterious_trinket', ['nameless_trinkets:ethereal_wings'])
    event.shapeless('kubejs:mysterious_trinket', ['nameless_trinkets:creeper_sense'])
    event.shapeless('kubejs:mosquito_repellent', ['irons_spellbooks:magic_cloth', 'chestcavity:cooked_alien_organ_meat'])
    
    event.shapeless('chestcavity:appendix', [Ingredient.of(['@chestcavity', '#kubejs:organ']), 'biomancy:healing_additive'])
        .modifyResult((grid, stack) => {
            for (let i = 0; i <= 9; i++) {
                let organ = grid.get(i)
                if (organ && organ.hasNBT() && organ.nbt.contains('chestcavity:organ_compatibility')) {
                    return Item.of(organ.id);
                }
            }
            return null;
        });



    event.shapeless('kubejs:lost_paradise', ['kubejs:paradise_regained', 'kubejs:god_agreement'])

    event.shaped('kubejs:empty_organ_charm', [
        ['#forge:glass', '#minecraft:logs', '#forge:glass'],
        ['#forge:glass', 'minecraft:ghast_tear', '#forge:glass'],
        ['#forge:glass', '#forge:glass', '#forge:glass']])

    event.shaped('kubejs:friend_to_the_end', [
        ['lightmanscurrency:coin_gold', '#forge:gems/diamond', 'lightmanscurrency:coin_gold'],
        ['lightmanscurrency:coin_gold', '', 'lightmanscurrency:coin_gold'],
        ['lightmanscurrency:coin_gold', 'lightmanscurrency:coin_gold', 'lightmanscurrency:coin_gold']])

    event.shaped('irons_spellbooks:silver_ring', [
        ['kubejs:silver_ingot', 'kubejs:silver_ingot', 'kubejs:silver_ingot'],
        ['kubejs:silver_ingot', '', 'kubejs:silver_ingot'],
        ['kubejs:silver_ingot', 'kubejs:silver_ingot', 'kubejs:silver_ingot']])

    event.shaped('kubejs:color_palette', [
        ['create:iron_sheet', 'create:iron_sheet', 'create:iron_sheet'],
        ['createaddition:electrum_sheet', 'create:clipboard', 'createaddition:electrum_sheet'],
        ['#forge:dyes/blue', '#forge:dyes/red', '#forge:dyes/green']])

    event.shaped('kubejs:rapier_wand', [
        ['', 'hexerei:selenite_shard', ''],
        ['', 'hexerei:selenite_shard', ''],
        ['hexerei:moon_dust', 'nameless_trinkets:moon_stone', 'hexerei:moon_dust']])

    event.shaped('kubejs:flora_wand', [
        ['bosses_of_mass_destruction:void_thorn', 'bosses_of_mass_destruction:crystal_fruit', 'bosses_of_mass_destruction:void_thorn'],
        ['', 'minecraft:stick', ''],
        ['', 'minecraft:stick', '']])

    event.shaped('kubejs:holy_wooden_wand', [
        ['minecraft:stick', 'irons_spellbooks:holy_rune', 'minecraft:stick'],
        ['#minecraft:logs', 'minecraft:stick', '#minecraft:logs'],
        ['', '#minecraft:saplings', '']])

    event.shaped('kubejs:ice_wooden_wand', [
        ['minecraft:stick', 'irons_spellbooks:ice_rune', 'minecraft:stick'],
        ['#minecraft:logs', 'minecraft:stick', '#minecraft:logs'],
        ['', '#minecraft:saplings', '']])

    event.shaped('kubejs:nature_wooden_wand', [
        ['minecraft:stick', 'irons_spellbooks:nature_rune', 'minecraft:stick'],
        ['#minecraft:logs', 'minecraft:stick', '#minecraft:logs'],
        ['', '#minecraft:saplings', '']])

    event.shaped('kubejs:ceremonial_knife', [
        ['', 'kubejs:silver_ingot', ''],
        ['', 'biomancy:bone_fragments', ''],
        ['biomancy:bone_fragments', 'alexsmobs:skelewag_sword', 'biomancy:bone_fragments']])

    event.shaped('kubejs:artist_wand', [
        ['', '', 'goety:unholy_blood'],
        ['createaddition:electrum_wire', 'minecraft:white_wool', ''],
        ['minecraft:stick', 'createaddition:electrum_wire', '']])

    event.smelting('minecraft:iron_ingot', 'kubejs:common_mineral_cluster', '5.0')
    event.blasting('minecraft:iron_ingot', 'kubejs:common_mineral_cluster', '5.0')
    
    event.smelting('kubejs:silver_ingot', 'kubejs:raw_silver', '5.0')
    event.blasting('kubejs:silver_ingot', 'kubejs:raw_silver', '5.0')

    event.smelting('kubejs:silver_ingot', 'kubejs:rare_mineral_cluster', '10.0')
    event.blasting('kubejs:silver_ingot', 'kubejs:rare_mineral_cluster', '10.0')

    event.shaped('kubejs:doppelganger', [
        ['', 'nameless_trinkets:reverse_card', ''],
        ['minecraft:totem_of_undying', 'meetyourfight:phantoplasm', 'minecraft:totem_of_undying']])

    event.shaped('kubejs:silver_block', [
        ['kubejs:silver_ingot', 'kubejs:silver_ingot', 'kubejs:silver_ingot'],
        ['kubejs:silver_ingot', 'kubejs:silver_ingot', 'kubejs:silver_ingot'],
        ['kubejs:silver_ingot', 'kubejs:silver_ingot', 'kubejs:silver_ingot']])

    event.shaped('kubejs:raw_silver_block', [
        ['kubejs:raw_silver', 'kubejs:raw_silver', 'kubejs:raw_silver'],
        ['kubejs:raw_silver', 'kubejs:raw_silver', 'kubejs:raw_silver'],
        ['kubejs:raw_silver', 'kubejs:raw_silver', 'kubejs:raw_silver']])

    event.shapeless('9x kubejs:silver_ingot', ['kubejs:silver_block'])
    event.shapeless('9x kubejs:raw_silver', ['kubejs:raw_silver_block'])

})