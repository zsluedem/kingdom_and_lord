#[cfg(test)]
use dojo::test_utils::{spawn_test_world, deploy_contract};
use kingdom_lord::components::barn::barn;
use starknet::ContractAddress;
use kingdom_lord::components::outer_city::outer_city;
use kingdom_lord::components::warehouse::warehouse;
use kingdom_lord::components::city_building::city_building;
use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
use kingdom_lord::actions::{kingdom_lord_controller};
use kingdom_lord::interface::{
    IKingdomLordDispatcher, IKingdomLordAdminDispatcher, IKingdomLordAdmin,
    IKingdomLordTestDispatcherImpl, IKingdomLordLibraryDispatcherImpl,
    IKingdomLordAdminDispatcherImpl, IKingdomLordDispatcherTrait, IKingdomLordTestDispatcher
};
use openzeppelin::token::erc20::interface::IERC20DispatcherImpl;
use kingdom_lord::actions::kingdom_lord_controller::world_dispatcherContractMemberStateTrait;
use kingdom_lord::tests::upgrade_func::{
    level1_barrack, level2_barrack, level3_barrack, level4_barrack, level5_barrack, level6_barrack,
    level7_barrack, level8_barrack, level9_barrack, level10_barrack, level11_barrack,
    level12_barrack, level13_barrack, level14_barrack, level15_barrack, level16_barrack,
    level17_barrack, level18_barrack, level19_barrack, level20_barrack
};
use kingdom_lord::tests::upgrade_func::{
    level1_stable, level2_stable, level3_stable, level4_stable, level5_stable, level6_stable,
    level7_stable, level8_stable, level9_stable, level10_stable, level11_stable, level12_stable,
    level13_stable, level14_stable, level15_stable, level16_stable, level17_stable, level18_stable,
    level19_stable, level20_stable
};
use kingdom_lord::models::army::ArmyGroup;
use kingdom_lord::admin::kingdom_lord_admin;
use kingdom_lord::components::outer_city::OuterCityTraitDispatcher;
use kingdom_lord::tests::upgrade_proof::{
    barrack_level1_proof, stable_level1_proof, barrack_level2_proof, stable_level2_proof
};
use starknet::contract_address_const;
use openzeppelin::presets::erc20::ERC20;
use openzeppelin::token::erc20::interface::IERC20Dispatcher;
use kingdom_lord::models::time::get_current_time;
use starknet::testing::{set_caller_address, set_contract_address, set_block_number};
trait SerializedAppend<T> {
    fn append_serde(ref self: Array<felt252>, value: T);
}

impl SerializedAppendImpl<T, impl TSerde: Serde<T>, impl TDrop: Drop<T>> of SerializedAppend<T> {
    fn append_serde(ref self: Array<felt252>, value: T) {
        value.serialize(ref self);
    }
}

#[derive(Drop, Clone, Copy)]
struct TestContext {
    world: IWorldDispatcher,
    contract_address: ContractAddress,
    kingdom_lord: IKingdomLordDispatcher,
    kingdom_lord_test: IKingdomLordTestDispatcher,
    kingdom_lord_admin: IKingdomLordAdminDispatcher,
    // erc20_dispatcher: IERC20Dispatcher,
    // erc20_address: ContractAddress
}

// fn NAME() -> felt252 {
//     'test'
// }

// fn SYMBOL() -> felt252 {
//     'test'
// }

fn NAME() -> ByteArray {
    "NAME"
}

fn SYMBOL() -> ByteArray {
    "SYMBOL"
}

const SUPPLY: u256 = 2000000;

fn OWNER() -> ContractAddress {
    contract_address_const::<'OWNER'>()
}

fn PLAYER() -> ContractAddress {
    contract_address_const::<'PLAYER'>()
}

fn assert_resource(
    context: TestContext, player: ContractAddress, wood: u64, brick: u64, steel: u64, food: u64
) {
    let (actual_wood, actual_brick, actual_steel, actual_food) = context
        .kingdom_lord
        .get_resource(player);
    let actual_wood: u64 = actual_wood.into();
    let actual_brick: u64 = actual_brick.into();
    let actual_steel: u64 = actual_steel.into();
    let actual_food: u64 = actual_food.into();
    assert_eq!(actual_wood, wood, "resource wood should be {} but got {}", wood, actual_wood);
    assert_eq!(actual_brick, brick, "resource brick should be {} but got {}", brick, actual_brick);
    assert_eq!(actual_steel, steel, "resource steel should be {} but got {}", steel, actual_steel);
    assert_eq!(actual_food, food, "resource food should be {} but got {}", food, actual_food);
}

fn assert_armygroup(
    army: ArmyGroup,
    millitia: u64,
    guard: u64,
    heavy_infantry: u64,
    scouts: u64,
    knights: u64,
    heavy_knights: u64
) {
    assert_eq!(
        army.millitia,
        millitia,
        "millititia should be {} but got {}",
        army.millitia,
        millitia
    );
    assert_eq!(army.guard, guard, "guard should be {} but got {}", army.guard, guard);
    assert_eq!(
        army.heavy_infantry,
        heavy_infantry,
        "heavy_infantry should be {} but got {}",
        army.heavy_infantry,
        heavy_infantry
    );
    assert_eq!(
        army.scouts, scouts, "scouts should be {} but got {}", army.scouts, scouts
    );
    assert_eq!(
        army.knights, knights, "knights should be {} but got {}", army.knights, knights
    );
    assert_eq!(
        army.heavy_knights,
        heavy_knights,
        "heavy_knights should be {} but got {}",
        army.heavy_knights,
        heavy_knights
    );
}

fn assert_troop(
    context: TestContext,
    player: ContractAddress,
    millitia: u64,
    guard: u64,
    heavy_infantry: u64,
    scouts: u64,
    knights: u64,
    heavy_knights: u64
) {
    let troop = context.kingdom_lord.get_troops(player);
    assert_armygroup(troop.army, millitia, guard, heavy_infantry, scouts, knights, heavy_knights);
}

fn increase_time(time: u64) {
    let current_time = get_current_time();
    set_block_number(current_time + time);
}

fn full_level_barrack(context: TestContext, position: u64, player: ContractAddress) {
    level1_barrack(context, position, player);
    level2_barrack(context, position, player);
    level3_barrack(context, position, player);
    level4_barrack(context, position, player);
    level5_barrack(context, position, player);
    level6_barrack(context, position, player);
    level7_barrack(context, position, player);
    level8_barrack(context, position, player);
    level9_barrack(context, position, player);
    level10_barrack(context, position, player);
    level11_barrack(context, position, player);
    level12_barrack(context, position, player);
    level13_barrack(context, position, player);
    level14_barrack(context, position, player);
    level15_barrack(context, position, player);
    level16_barrack(context, position, player);
    level17_barrack(context, position, player);
    level18_barrack(context, position, player);
    level19_barrack(context, position, player);
    level20_barrack(context, position, player);
}

fn full_level_stable(context: TestContext, position: u64, player: ContractAddress) {
    level1_stable(context, position, player);
    level2_stable(context, position, player);
    level3_stable(context, position, player);
    level4_stable(context, position, player);
    level5_stable(context, position, player);
    level6_stable(context, position, player);
    level7_stable(context, position, player);
    level8_stable(context, position, player);
    level9_stable(context, position, player);
    level10_stable(context, position, player);
    level11_stable(context, position, player);
    level12_stable(context, position, player);
    level13_stable(context, position, player);
    level14_stable(context, position, player);
    level15_stable(context, position, player);
    level16_stable(context, position, player);
    level17_stable(context, position, player);
    level18_stable(context, position, player);
    level19_stable(context, position, player);
    level20_stable(context, position, player);
}


fn train_millitia(context: TestContext, amount: u64) {
    context.kingdom_lord_test.start_training_test(0, amount).expect('train millitia');
    increase_time(1600 * amount);
    context.kingdom_lord_test.finish_training_test(true).expect('finish training millitia');
}

fn train_scouts(context: TestContext, amount: u64) {
    context.kingdom_lord_test.start_training_test(3, amount).expect('train scouts');
    increase_time(1360 * amount);
    context.kingdom_lord_test.finish_training_test(false).expect('finish training scouts');
}

#[cfg(test)]
fn setup_world() -> TestContext {
    let mut models = array![
        barn::TEST_CLASS_HASH,
        warehouse::TEST_CLASS_HASH,
        city_building::TEST_CLASS_HASH,
        outer_city::TEST_CLASS_HASH
    ];
    // deploy world with models
    let world = spawn_test_world(models);
    // deploy systems contract
    let contract_address = world
        .deploy_contract(
            'salt1',
            kingdom_lord_controller::TEST_CLASS_HASH.try_into().expect('kingdom controller')
        );
    let admin_contract_address = world
        .deploy_contract(
            'salt2', kingdom_lord_admin::TEST_CLASS_HASH.try_into().expect('kindom admin')
        );

    // deploy erc20 contract
    let mut calldata: Array<felt252> = array![];
    let owner = OWNER();
    let name = NAME();
    let symbol = SYMBOL();
    name.serialize(ref calldata);
    symbol.serialize(ref calldata);
    SUPPLY.serialize(ref calldata);
    owner.serialize(ref calldata);
    // let (erc20_contract_address, _) = starknet::deploy_syscall(
    //     ERC20::TEST_CLASS_HASH.try_into().expect('erc20 test classs'), 0, calldata.span(), false
    // )
    //     .expect('expect deploy erc20');

    let admin_dispatcher = IKingdomLordAdminDispatcher { contract_address: admin_contract_address };
    // let erc20_dispatcher = IERC20Dispatcher { contract_address: erc20_contract_address };
    set_caller_address(PLAYER());
    set_contract_address(PLAYER());
    admin_dispatcher
        .set_config(
            // erc20_contract_address,
            owner,
            200_u256,
            owner,
            0x608f06197fc3aab41e774567c8e4b7e8fa5dae821240eda6b39f22939315f8c
        );
    TestContext {
        world,
        contract_address,
        kingdom_lord: IKingdomLordDispatcher { contract_address },
        kingdom_lord_test: IKingdomLordTestDispatcher { contract_address },
        kingdom_lord_admin: admin_dispatcher,
        // erc20_dispatcher,
        // erc20_address: erc20_contract_address
    }
}
