import { DriverDto, DriverEntity } from '../model/domain';

export class DriversSecurityUtils {
  public static driverDtoToEntity = (driverDto: DriverDto): DriverEntity => {
    const { passwordHash: _, ...driver } = driverDto;

    return driver;
  };

  public static driverDtoToEntityArray = (
    drivers: DriverDto[],
  ): DriverEntity[] => {
    return drivers.map(this.driverDtoToEntity);
  };
}
