const $ParticleTypes = Java.loadClass('net.minecraft.core.particles.ParticleTypes')
const resourceCount = 'resourceCount'
const resourceCountMax = 'resourceCountMax'
const defaultResourceMax = 100
const warpCount = 'warpCount'
const warpCountMax = 'warpCountMax'
const defaultWarpMax = 100

const organActive = 'organActive'

const bossTypeList = [
    'somebosses:aesegull',
    'somebosses:prismarine_watcher',
    'somebosses:froverlord',
    'somebosses:volcanium',
    'somebosses:merciless_assasin',
    'somebosses:dark_mask',
    'somebosses:knight_garent',
    'somebosses:vulcan',
    'somebosses:ancient_wizard',
    'somebosses:man_of_water',
    'somebosses:flaming_berserker',
    'somebosses:electric_head',
    'somebosses:frost_magma',
    'somebosses:stone_guard',
    'somebosses:crimson_vampire',
    'somebosses:skeleton_demon',
    'somebosses:mono_eyed_skeleton',
    'somebosses:hand_head',
    'somebosses:ender_ordnance',
    'somebosses:nameless_one',
    'somebosses:sand_giant',
    "somebosses:rib_golem",
    'cataclysm:netherite_monstrosity',
    'cataclysm:ender_guardian',
    'cataclysm:ignis',
    'cataclysm:the_harbinger',
    'cataclysm:the_leviathan',
    'cataclysm:ancient_remnant',
    'cataclysm:modern_remnant',
    'bosses_of_mass_destruction:void_blossom',
    'bosses_of_mass_destruction:lich',
    'bosses_of_mass_destruction:gauntlet',
    'bosses_of_mass_destruction:obsidilith',
    'meetyourfight:bellringer',
    'meetyourfight:rosalyne',
    'meetyourfight:swampjaw',
    'meetyourfight:dame_fortuna',
    'invasioncodered:gashslit',
    'irons_spellbooks:dead_king_corpse',
]

const bossesOfMassDestructionBossTypeList = [
    'bosses_of_mass_destruction:void_blossom',
    'bosses_of_mass_destruction:lich',
    'bosses_of_mass_destruction:gauntlet',
    'bosses_of_mass_destruction:obsidilith',
]
const worldOfBossTypeList = [
    'somebosses:aesegull',
    'somebosses:prismarine_watcher',
    'somebosses:froverlord',
    'somebosses:volcanium',
    'somebosses:merciless_assasin',
    'somebosses:dark_mask',
    'somebosses:knight_garent',
    'somebosses:vulcan',
    'somebosses:ancient_wizard',
    'somebosses:man_of_water',
    'somebosses:flaming_berserker',
    'somebosses:electric_head',
    'somebosses:frost_magma',
    'somebosses:stone_guard',
    'somebosses:crimson_vampire',
    'somebosses:skeleton_demon',
    'somebosses:mono_eyed_skeleton',
    'somebosses:hand_head',
    'somebosses:ender_ordnance',
    'somebosses:nameless_one',
    'somebosses:sand_giant',
    "somebosses:rib_golem",
]


const tumorAttriBute = [
    { name: 'chestcavity:filtration', muti: 1, max: 5 },
    { name: 'chestcavity:breath_recovery', muti: 0.5, max: 5 },
    { name: 'chestcavity:nutrition', muti: 1, max: 5 },
    { name: 'chestcavity:nerves', muti: 0.25, max: 5 },
    { name: 'chestcavity:strength', muti: 1, max: 5 },
    { name: 'chestcavity:health', muti: 1, max: 5 },
    { name: 'chestcavity:breath_capacity', muti: 0.5, max: 5 },
    { name: 'chestcavity:detoxification', muti: 1, max: 5 },
    { name: 'chestcavity:speed', muti: 0.25, max: 5 },
    { name: 'chestcavity:endurance', muti: 1, max: 5 },
    { name: 'chestcavity:luck', muti: 0.5, max: 5 },
    { name: 'chestcavity:defense', muti: 0.25, max: 5 },
    { name: 'chestcavity:digestion', muti: 1, max: 5 },
    { name: 'chestcavity:metabolism', muti: 1, max: 5 },
    { name: 'chestcavity:fire_resistant', muti: 0.5, max: 5 },
    { name: 'chestcavity:knockback_resistant', muti: 0.5, max: 5 },
    { name: 'chestcavity:water_breath', muti: 0.5, max: 5 },
]

const curseEnchantList = [
    'cursery:curse_electrified',
    'cursery:curse_switchy',
    'cursery:curse_illusion',
    'cursery:curse_undead',
    'cursery:curse_laddering',
    'cursery:curse_hungryhealth',
    'cursery:curse_slowness',
    'cursery:curse_poison',
    'cursery:curse_steelfeet',
    'cursery:curse_heavy_enchant',
    'cursery:curse_explosive',
    'cursery:curse_recoil',
    'cursery:curse_stubby',
    'cursery:curse_hurtful',
    'cursery:curse_loose',
    'cursery:curse_weakness',
    'cursery:curse_hungry',
    'cursery:curse_anvil',
    'cursery:curse_blindness',
]

const trinketList = ['nameless_trinkets:reforger', 'nameless_trinkets:true_heart_of_the_sea', 'nameless_trinkets:dragons_eye', 'nameless_trinkets:spider_legs', 'nameless_trinkets:sleeping_pills', 'nameless_trinkets:moon_stone', 'nameless_trinkets:nelumbo', 'nameless_trinkets:four_leaf_clover', 'nameless_trinkets:dark_nelumbo', 'nameless_trinkets:super_magnet', 'nameless_trinkets:rage_mind', 'nameless_trinkets:puffer_fish_liver', 'nameless_trinkets:lucky_rock', 'nameless_trinkets:vampire_blood', 'nameless_trinkets:speed_force', 'nameless_trinkets:tick', 'nameless_trinkets:ghast_eye', 'nameless_trinkets:cracked_crown', 'nameless_trinkets:blindfold', 'nameless_trinkets:ice_cube', 'nameless_trinkets:blaze_nucleus', 'nameless_trinkets:wooden_stick', 'nameless_trinkets:tear_of_the_sea', 'nameless_trinkets:gods_crown', 'nameless_trinkets:fertilizer', 'nameless_trinkets:sigil_of_baphomet', 'nameless_trinkets:gills', 'nameless_trinkets:amphibious_hands', 'nameless_trinkets:fragile_cloud', 'nameless_trinkets:light_gloves', 'nameless_trinkets:fate_emerald', 'nameless_trinkets:scarab_amulet', 'nameless_trinkets:miners_soul', 'nameless_trinkets:pocket_lightning_rod', 'nameless_trinkets:fractured_nullstone', 'nameless_trinkets:electric_paddle', 'nameless_trinkets:reverse_card', 'nameless_trinkets:missing_page', 'nameless_trinkets:broken_magnet', 'nameless_trinkets:experience_magnet', 'nameless_trinkets:broken_ankh', 'nameless_trinkets:experience_battery', 'nameless_trinkets:what_magnet', 'nameless_trinkets:callus']

